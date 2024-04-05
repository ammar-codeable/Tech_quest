import dotenv from "dotenv/config";
import mongoose from 'mongoose';
export async function  Connection(){

    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("connected to db");
    }).catch(err =>{
        console.log(err)
    });
    // await mongoose.connect(process.env.DB_URL)
}