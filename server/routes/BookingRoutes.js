import express from "express"
import { getBookingById, newBooking,deleteBooking } from "../controllers/BookingController.js";

const bookingRouter=express.Router();

bookingRouter.post("/",newBooking);
bookingRouter.get("/:id",getBookingById);
bookingRouter.delete("/:id",deleteBooking);

export default bookingRouter;