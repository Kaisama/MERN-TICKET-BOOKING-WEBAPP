import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const newBooking = async (req, res) => {
    const { movie, date, seatNumber, user } = req.body;

    let existingMovie;
    let existingUser;

    try {
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error finding movie or user", error: error.message });
    }

    if (!existingMovie) {
        return res.status(404).json({ message: "Movie not found" });
    }
    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }

    let Book;
    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();

        Book = new Booking({ movie, date: new Date(`${date}`), seatNumber, user });
        
        existingUser.bookings.push(Book);
        existingMovie.bookings.push(Book);
        
        await existingUser.save({ session });
        await existingMovie.save({ session });
        await Book.save({ session });
        
        await session.commitTransaction();
        session.endSession();
    } catch (error) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        console.log(error);
        return res.status(500).json({ message: "Booking failed", error: error.message });
    }

    if (!Book) {
        return res.status(500).json({ message: "Unable to create a booking" });
    }
    return res.status(200).json({ message: "Booking created successfully", book: Book });
};