const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema({
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: "flightCollection" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "userCollection" },
  numberOfSeats: { type: Number },
  totalPrice: { type: Number },
  bookingStatus: { type: String },
});

const bookingCollection = mongoose.model("bookingCollection", bookingsSchema);

const getAllBookingsFromDb = async () => await bookingCollection.find();
const getBookingsById = async (id) => await bookingCollection.findById(id);
const createBookingToDb = async (data) => await bookingCollection.create(data);

module.exports = { getAllBookingsFromDb, getBookingsById, createBookingToDb };
