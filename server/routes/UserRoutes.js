import express from 'express';
import { signUp, getAllUsers, updateUser, deleteUser ,loginUser, getBookingsOfUser} from '../controllers/UserController.js';

const UserRouter = express.Router();

UserRouter.get("/",getAllUsers);
UserRouter.post("/signup",signUp);
UserRouter.patch("/:id",updateUser);
UserRouter.delete("/:id",deleteUser);
UserRouter.post("/login",loginUser);
UserRouter.get("/bookings/:id",getBookingsOfUser);




export default UserRouter;