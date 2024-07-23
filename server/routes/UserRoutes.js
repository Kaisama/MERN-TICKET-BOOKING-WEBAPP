import express from 'express';
import { signUp, getAllUsers, updateUser, deleteUser } from '../controllers/UserController.js';

const UserRouter = express.Router();

UserRouter.get("/",getAllUsers);
UserRouter.post("/signup",signUp);
UserRouter.patch("/updateUser/:id",updateUser);
UserRouter.delete("/:id",deleteUser);




export default UserRouter;