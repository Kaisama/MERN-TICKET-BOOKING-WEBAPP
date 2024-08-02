import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const adminSignup=async(req,res)=>{
    const{email,password}=req.body;
    let existingAdmin;
    if(!email && email.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({message:"Invalid Inputs"})
    }
    try {
        existingAdmin=await Admin.findOne({email})
    } catch (error) {
        return console.log(error);
    }

    if(existingAdmin){
        return res.status(400).json({message:"Admin already exists"})
    }

    let admin;
    const hashPassword=bcrypt.hashSync(password);
    try{
        admin =new Admin({email,password:hashPassword});
        admin= await admin.save()
    }catch(error){
      return  console.log(error);
    }
    if(!admin){
        return res.status(500).json({message:"Unable to store admin"})
    }
    return res.status(201).json({admin})
}

export const adminLogin=async(req,res)=>{
    const {email,password}=req.body;
    if(!email && email.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({message:"Invalid Inputs"})
    }
    let existingAdmin;
    try {
        existingAdmin=await Admin.findOne({email})
    } catch (error) {
        return console.log(error);
    }
    if(!existingAdmin){
        return res.status(400).json({message:"Admin not found"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingAdmin.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid Credentials"})
    }

    const token= jwt.sign({id:existingAdmin._id},process.env.JWT_SECRET_KEY,{
        expiresIn:"1d",
    })

    return res.status(200).json({message:"Authentication Completed",token,id:existingAdmin._id})
}

export const getAllAdmins=async(req,res)=>{
    let admins;
    try {
        admins=await Admin.find();
    } catch (error) {
        return console.log(error);
    }
    if(!admins){
        return res.status(500).json({message:"Unable to fetch admins"})
    }
    return res.status(200).json({admins})
}

export const getAdminById = async (req, res) => {
    const id = req.params.id;
  
  
  
    let admin;
    try {
      admin = await Admin.findById(id).populate("addedMovies");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
  
    return res.status(200).json({ admin });
  };