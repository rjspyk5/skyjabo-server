const mongoose = require("mongoose");

const flightsSchema = new mongoose.Schema({
  flightNumber: { type: String },
  airline: { type: String },
  origin: { type: String },
  destination: { type: String },
  duration: { type: String },
  date: { type: Date },
  time: { type: String },
  price: { type: Number },
  duration: { type: Number },
  availableSeats: { type: Number },
});

const flightCollection = mongoose.model("flightCollection", flightsSchema);

const getAllFlightsFromDb = async (filter) =>
  await flightCollection.find(filter);
const getAllAirelines = async () => await flightCollection.distinct("airline");
const getFlightsById = async (id) =>
  await flightCollection.findOne({ _id: id });
const createFlightToDb = async (data) => await flightCollection.create(data);
const deleteFlight = async (id) =>
  await flightCollection.deleteOne({ _id: id });
const updatFlightToDb = async (id, data) =>
  await flightCollection.updateOne({ _id: id }, { $set: data });

module.exports = {
  getAllFlightsFromDb,
  getFlightsById,
  createFlightToDb,
  deleteFlight,
  updatFlightToDb,
  getAllAirelines,
};
