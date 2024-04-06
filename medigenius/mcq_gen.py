from fastapi import Body, FastAPI, Request, responses
from langchain.prompts import PromptTemplate
import os
import json
from fastapi.middleware.cors import CORSMiddleware
from langchain.chains import LLMChain,SequentialChain
from pymongo.mongo_client import MongoClient
import uvicorn
from os.path import join, dirname
from fastapi import FastAPI, File, UploadFile
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI


dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

app = FastAPI()
#update your mongo uri
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
mcq_ai = ChatGoogleGenerativeAI(model="gemini-pro",verbose=True)
@app.get("/genTopics")
async def generate_Topics():
    output_format = '{"topics":["topic 1". "topic 2", "topic 3"]}'
    prompt = PromptTemplate(input_variables=["output_format"],template='''
        Generate topics for a financial quiz 
        OUTPUT_FORMAT:
        {output_format}
    ''')
    chain_1 = LLMChain(llm=mcq_ai, prompt=prompt)
    response =  chain_1.invoke({"output_format":output_format})
    response["text"] = response["text"].replace("'''","").replace("\n","")
    result = json.loads(response["text"])
    return result

@app.get("/genMCQs")
def generate_MCQs(topic:str,difficulty:str,num_questions:int):
    output_format = '''{"questions"[{"question": "question 1","options": ["option 1","option 2","option 3","option 4"],"answer": "option 2"}]}'''
    prompt = PromptTemplate(input_variables=["output_format","topic","difficulty","num_questions"],template="""
        Generate MCQs for a financial quiz 
        of the topic {topic}
        of difficulty level {difficulty}
        the number of questions {num_questions}
        OUTPUT_FORMAT:
        {output_format}
    """)
    chain_1 = LLMChain(llm=mcq_ai, prompt=prompt)
    response =  chain_1.invoke({"output_format":output_format,"topic":topic,"difficulty":difficulty,"num_questions":num_questions})

    # response["text"] = response["text"].replace("'", "#").replace('"', "'").replace("#", '"')    
    result = """"""
    for char in response["text"]:
        result += char if char != "'"  else '"' 

    result = json.loads(result)
    return response["text"]

@app.get("/nbGuide/{userId}")
def processQuery(userId:str,query:str):
    try:
        # db name
        collection = client["nirvana"]["users"]
        user =  collection.find_one({"userId": userId})
        user_details = user["user"]["financial_details"]
    except Exception as e:
        user_details=""
    prompt = PromptTemplate(input_variables=["user_details","query"],template='''
        You are nbGuide a guide for a user who is looking for a financial guide
        The user has the following details
        {user_details}
        The user has the following query 
        {query}
        Try to answer the query in the best possible way
    ''')
    chain_1 = LLMChain(llm=mcq_ai, prompt=prompt)
    response =  chain_1.invoke({"user_details":user_details,"query":query},output_key="ai")
    return response["ai"]
    
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4000)