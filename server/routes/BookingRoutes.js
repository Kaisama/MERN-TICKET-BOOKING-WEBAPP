import express from "express"
import { newBooking } from "../controllers/BookingController.js";

const bookingRouter=express.Router();

bookingRouter.post("/",newBooking);

export default bookingRouter;