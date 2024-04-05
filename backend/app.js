import express from 'express';
import userRoutes from './routes/userRoute.js';
import bodyParser from 'body-parser';
import cors from 'cors';


const app=express();
app.use(cors({origin:true,credentials:true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/users',userRoutes);


export default app;