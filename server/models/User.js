import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:5,
    },
    bookings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
    }]
})

export default mongoose.model("User",userSchema);