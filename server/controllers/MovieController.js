import jwt from "jsonwebtoken";
import Movie from "../models/Movie.js";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";

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
        movie = new Movie({title,description,releaseDate:new Date(`${releaseDate}`),featured,actors,posterUrl,admin:adminId})
        const session=await mongoose.startSession();
        const adminUser=await Admin.findById(adminId);
        session.startTransaction();
        await movie.save({session});
        adminUser.addedMovies.push(movie);
        await adminUser.save({session});
        await session.commitTransaction();

    } catch (error) {
       return console.log(error);
    }

    if(!movie){
        return res.status(404).json({message:"Movie Not Found"})
    }

    return res.status(201).json({message:"Movie Added",movie:movie})

}

export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        

        if (!movies || movies.length === 0) {
            return res.status(404).json({ message: "Movies Not Found" });
        }

        return res.status(200).json({ movies });
    } catch (error) {
        
        console.error('Error fetching movies:', error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const getMovieById=async(req,res)=>{
    let movie;
    const id=req.params.id;
    try {
        movie=await Movie.findById(id)
    } catch (error) {
        return console.log(error);
    }
    if(!movie){
        return res.status(404).json({message:"Invalid Id"}) 
    }
    return res.status(200).json({movie});
}