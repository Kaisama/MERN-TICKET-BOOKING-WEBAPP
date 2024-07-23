import express from 'express';
import { signUp, getAllUsers } from '../controllers/UserController.js';

const UserRouter = express.Router();

UserRouter.get("/allUser",getAllUsers)
UserRouter.post("/signup",signUp)


export default UserRouter;