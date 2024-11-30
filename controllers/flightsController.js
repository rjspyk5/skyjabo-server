const Amadeus = require("amadeus");
const { createFlightToDb } = require("../model/flightsModel");
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

const flightSearch = async (req, res) => {
  try {
    const data = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: "BOS",
      destinationLocationCode: "LON",
      departureDate: "2024-12-05",
      adults: "2",
    });
    res.send(data.data);
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

const createFlight = async (req, res) => {
  const data = req?.body;
  try {
    const result = await createFlightToDb(data);
    if (result) {
      res.send({ message: "Create Flight Successfully" });
    }
  } catch (error) {
    res.send({ message: "Something Went Wrong" });
  }
};

module.exports = { flightSearch, createFlight };
