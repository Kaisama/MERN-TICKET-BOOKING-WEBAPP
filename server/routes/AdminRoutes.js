import express from "express"
import { adminSignup } from "../controllers/AdminController";

const adminRoute=express.Router();

adminRoute.post("/signup",adminSignup);