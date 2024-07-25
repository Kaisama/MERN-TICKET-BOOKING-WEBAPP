import express from "express"
import { adminSignup ,adminLogin, getAllAdmins} from "../controllers/AdminController.js";

const adminRouter=express.Router();

adminRouter.post("/signup",adminSignup);
adminRouter.post("/login",adminLogin);
adminRouter.get("/all",getAllAdmins);



export default adminRouter;