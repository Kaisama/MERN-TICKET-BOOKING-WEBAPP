import User from "../models/User.js";
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log('Users found:', users);
        res.json({users});
    } catch (error) {
        console.error('Error in getAllUsers:', error);
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
};
  

export const signUp=async(req,res)=>{

        const {name,email,password}=req.body;
        let user;

        if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim()===""){
            return res.status(422).json({message:"Invalid Input"})
        }

        const hashPassword=bcrypt.hashSync(password);

        try {
            user= new User({name,email,password:hashPassword});
            user=await user.save();
        } catch (error) {
            console.log(error)
        }

        if(!user){
            return res.status(500).json({message:"Unexpected Error Occur"})
        }

        return res.status(201).json({user})
}


export const updateUser=async(req,res)=>{
 const id=req.params.id;
 const {name,email,password}=req.body;
 if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim()===""){
    return res.status(422).json({message:"Invalid Input"})
}

let user;
const hashPassword=bcrypt.hashSync(password);
try {
    user=await User.findByIdAndUpdate(id,{name,email,password:hashPassword});
} catch (error) {
    console.log(error)
}
if(!user){
    return res.status(500).json({message:"Unexpected Error Occur"})
}

return res.status(200).json({message:"Updated Successfully"})

}

export const deleteUser=async(req,res)=>{
    const id=req.params.id;
    let user;
    try {
        user=await User.findByIdAndDelete(id);
    
    } catch (error) {
        console.log(error);
    }
    if(!user){
        return res.status(500).json({message:"Unexpected Error Occur"})
    }
    return res.status(200).json({message:"Deleted Successfully"})

}

export const loginUser=async(req,res)=>{
const{email,password}=req.body;
if(!email && email.trim()==="" && !password && password.trim()===""){
    return res.status(422).json({message:"Invalid Inputs"})
}
let existingUser;
try {
    existingUser=await User.findOne({email});
} catch (error) {
    return error
}

if(!existingUser){
    return res.status(404).json({message:"User Not Found"})
}

const checkPassword=bcrypt.compareSync(password,existingUser.password);
if(!checkPassword){
    return res.status(400).json({message:"Invalid Credentials"})
}
return res.status(200).json({message:"Login Successfully"})
}