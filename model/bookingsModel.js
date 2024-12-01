const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema({
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: "flightCollection" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "userCollection" },
  numberOfSeats: { type: Number },
  status: { type: String },
  name: { type: String },
  phone: { type: Number },
  totalPrice: { type: Number },
  bookingStatus: { type: String },
});

const bookingCollection = mongoose.model("bookingCollection", bookingsSchema);

const getAllBookingsFromDb = async () => await bookingCollection.find();
const getBookingsById = async (id) => {
  return await bookingCollection.find({ userId: id });
};

const createBookingToDb = async (data) => await bookingCollection.create(data);
const deleteBookingToDb = async (id) =>
  await bookingCollection.deleteOne({ _id: id });
const updateBookingToDb = async (id, data) =>
  await bookingCollection.updateOne({ _id: id }, { $set: data });

module.exports = {
  getAllBookingsFromDb,
  getBookingsById,
  createBookingToDb,
  deleteBookingToDb,
  updateBookingToDb,
};
