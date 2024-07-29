import express from"express";
import connectDB from "./database/db.js";
import dotenv from "dotenv";
import UserRouter from "./routes/UserRoutes.js";
import adminRouter from "./routes/AdminRoutes.js";
import movieRouter from "./routes/MovieRoutes.js";
import bookingRouter from "./routes/BookingRoutes.js";
import cors from 'cors';
const app=express();

dotenv.config();
const port=process.env.PORT;
app.use(express.json())
app.use(cors())
connectDB();


//middlewares
app.use("/user",UserRouter)
app.use("/admin",adminRouter)
app.use("/movie",movieRouter)
app.use("/booking",bookingRouter)




app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})