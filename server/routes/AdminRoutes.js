import express from "express"
import { adminSignup,getAdminById ,adminLogin, getAllAdmins} from "../controllers/AdminController.js";

const adminRouter=express.Router();

adminRouter.post("/signup",adminSignup);
adminRouter.post("/login",adminLogin);
adminRouter.get("/",getAllAdmins);
adminRouter.get('/:id',getAdminById);



export default adminRouter;