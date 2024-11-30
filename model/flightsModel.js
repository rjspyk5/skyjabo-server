const mongoose = require("mongoose");

const flightsSchema = new mongoose.Schema({
  flightNumber: { type: String },
  airline: { type: String },
  origin: { type: String },
  destination: { type: String },
  date: { type: Date },
  time: { type: String },
  price: { type: Number },
  availableSeats: { type: Number },
});

const flightCollection = mongoose.model("flightCollection", flightsSchema);

const getAllFlightsFromDb = async () => await flightCollection.find();
const getFlightsById = async (id) => await flightCollection.findById(id);
const createFlightToDb = async (data) => await flightCollection.create(data);
const deleteFlight = async (id) => await flightCollection.findByIdAndDelete(id);
const updatFlightToDb = async (id, data) =>
  await flightCollection.updateOne({ _id: id }, { $set: data });

module.exports = {
  getAllFlightsFromDb,
  getFlightsById,
  createFlightToDb,
  deleteFlight,
  updatFlightToDb,
};
