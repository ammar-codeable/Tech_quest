from fastapi import Body, FastAPI, Request, responses
from langchain_community.document_loaders import PyPDFLoader
from langchain.prompts import PromptTemplate
from pymongo.mongo_client import MongoClient
from dotenv import load_dotenv
from langchain.chains import LLMChain,SequentialChain
from fastapi import FastAPI, File, UploadFile
import aiofiles
from fastapi.middleware.cors import CORSMiddleware
from langchain_google_genai import ChatGoogleGenerativeAI
import os
import uvicorn
from os.path import join, dirname

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

app = FastAPI()
client = MongoClient(os.getenv("MONGO_URI"))

origins = [
    "http://localhost:3000",
    "https://localhost:3000",
    'http://localhost:5173',
    'https://localhost:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/userMedicalDetails/{id}")
async def generate_report(id:str,file: UploadFile = File()):
    out_file_loc = file.filename
    async with aiofiles.open(out_file_loc, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content) 
    loader = PyPDFLoader(out_file_loc,extract_images=True)
    pages = loader.load()
    details = ""
    for i in range(len(pages)):
        details += pages[i].page_content
    doctor_ai = ChatGoogleGenerativeAI(model="gemini-pro",verbose=True)
    prompt = PromptTemplate(input_variables=["details"],template='''
        Your an expert Doctor Generate a medical report for the patient
        DETAILS:
        Do not miss even a single detail make it structured and clear and easy to read
        {details}
    ''')
    chain_1 = LLMChain(llm=doctor_ai, prompt=prompt)
    response =  chain_1.invoke({"details":details})
    collection = client["techquest"]["users"]
    collection.update_one({"userId": id}, {"$set": {"userReport": response}})
    return {"success":True,"message":"Medical report generated successfully"}

@app.get("/mediGenius/{id}")
async def get_report(id:str):
    collection = client["techquest"]["users"]
    user = collection.find_one({"userId": id})
    userreport = user["userReport"]
    doctor_ai = ChatGoogleGenerativeAI(model="gemini-pro",verbose=True)
    prompt = PromptTemplate(input_variables=["details","userQuery"],template='''
        Your an expert Doctor assist your patient with the medical details
        DETAILS:
        {details}
        Query:
        {userQuery}
    ''')
    chain_1 = LLMChain(llm=doctor_ai, prompt=prompt)
    response =  chain_1.invoke({"details":userreport})
    return response["text"]

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4000)