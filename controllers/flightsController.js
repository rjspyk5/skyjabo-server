const Amadeus = require("amadeus");
const {
  createFlightToDb,
  getAllFlightsFromDb,
  deleteFlight,
  updatFlightToDb,
  getFlightsById,
} = require("../model/flightsModel");
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

const getAllFlights = async (req, res) => {
  try {
    const result = await getAllFlightsFromDb();
    res.send(result);
  } catch (error) {
    console.log("Error fetching flights:", error);
    res.send({ message: "Something Went Wrong" });
  }
};
const getFlight = async (req, res) => {
  const id = req.params;
  try {
    const result = await getFlightsById(id);
    res.send(result);
  } catch (error) {
    res.send({ message: "Something Went Wrong" });
  }
};

const deleteFlightById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await deleteFlight(id);
    if (result.deletedCount) {
      res.send({ message: "Delete Flight Successfully" });
    } else {
      res.send({ message: "Something Went Wrong" });
    }
  } catch (error) {
    res.send({ message: "Something Went Wrong" });
  }
};

const updateFlight = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await updatFlightToDb(id, data);
  if (result.modifiedCount) {
    return res.send({ message: "Update Successfully" });
  }
  return res.send({ message: "Something Went Wrong" });
};

module.exports = {
  flightSearch,
  createFlight,
  getAllFlights,
  deleteFlightById,
  updateFlight,
  getFlight,
};
