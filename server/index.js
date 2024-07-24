import express from"express";
import connectDB from "./database/db.js";
import dotenv from "dotenv";
import UserRouter from "./routes/UserRoutes.js";
import adminRouter from "./routes/AdminRoutes.js";
const app=express();

dotenv.config();
const port=process.env.PORT;
app.use(express.json())

connectDB();


//middlewares
app.use("/user",UserRouter)
app.use("/admin",adminRouter)


app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})