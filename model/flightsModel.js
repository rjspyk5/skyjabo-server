const mongoose = require("mongoose");

const flightsSchema = new mongoose.Schema({
  flightNumber: { type: Number },
  airline: { type: String },
  origin: { type: String },
  destination: { type: String },
  date: { type: Date },
  time: { type: String },
  price: { type: Number },
  availableSeats: { type: Number },
});

const flightCollection = mongoose.model("flightCollection", flightsSchema);
