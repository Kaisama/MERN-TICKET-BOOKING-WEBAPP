import User from "../models/User.js";

export const getAllUsers =async(req,res,next)=>{
    let users;
    try {
        users = await User.find();
        
    } catch (error) {
        return console.log(error);
    }

    if(!users){
        return res.status(500).json({message:"Unexpected Error Occur"})
    }

    return res.status(200).json({users})
}

export const signUp=async(req,res)=>{

        const {name,email,password}=req.body;
        let user;

        if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim()===""){
            return res.status(422).json({message:"Invalid Input"})
        }

        try {
            user= new User({name,email,password});
            user=await user.save();
        } catch (error) {
            console.log(error)
        }

        if(!user){
            return res.status(500).json({message:"Unexpected Error Occur"})
        }

        return res.status(201).json({user})
}
