import express from "express"
import { adminSignup ,adminLogin} from "../controllers/AdminController.js";

const adminRouter=express.Router();

adminRouter.post("/signup",adminSignup);
adminRouter.post("/login",adminLogin);


export default adminRouter;