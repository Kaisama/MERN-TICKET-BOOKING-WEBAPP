import express from 'express'
import { addMovie,getAllMovies,getMovieById } from '../controllers/MovieController.js';

const movieRouter = express.Router();

movieRouter.post("/",addMovie);
movieRouter.get("/",getAllMovies);
movieRouter.get("/:id",getMovieById);


export default movieRouter