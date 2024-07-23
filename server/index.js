import express from"express";
import connectDB from "./database/db.js";
import dotenv from "dotenv";
const app=express();

dotenv.config();
const port=process.env.PORT;
connectDB();


app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})