import jwt from "jsonwebtoken";
import Movie from "../models/Movie.js";

export const addMovie=async(req,res)=>{
    const extractedToken=req.headers.authorization.split(" ")[1];
    if(!extractedToken && extractedToken.trim()===""){
        return res.status(404).json({message:"Token Not Found"})
    }

    let adminId;
    //verify token
    jwt.verify(extractedToken,process.env.JWT_SECRET_KEY,(err,decrypted)=>{
        if(err){
            return res.status(404).json({message:"Token Not Found"})
        }else{
            adminId=decrypted.id;
            return;
        }
    })


    //create new movie
    const {title,description,releaseDate,posterUrl,featured,actors}=req.body;
    if(!title && title.trim()==="" && !description && description.trim()==="" && !posterUrl && posterUrl.trim()==="" ){
        return res.status(422).json({message:"Invalid"})
    }
    let movie;
    try {
        movie = new Movie({title,description,releaseDate:new Date(`${releaseDate}`),featured,actors,admin:adminId})
        movie= await movie.save();
    } catch (error) {
       return console.log(error);
    }

    if(!movie){
        return res.status(404).json({message:"Movie Not Found"})
    }

    return res.status(201).json({message:"Movie Added"})

}