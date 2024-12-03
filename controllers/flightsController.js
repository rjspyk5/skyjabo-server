const Amadeus = require("amadeus");
const {
  createFlightToDb,
  getAllFlightsFromDb,
  deleteFlight,
  updatFlightToDb,
  getFlightsById,
  getAllAirelines,
} = require("../model/flightsModel");
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

const flightSearchh = async (req, res) => {
  // try {
  //   const data = await amadeus.shopping.flightOffersSearch.get({
  //     originLocationCode: "BOS",
  //     destinationLocationCode: "LON",
  //     departureDate: "2024-12-05",
  //     adults: "2",
  //   });
  //   res.send(data.data);
  // } catch (error) {
  //   console.log(JSON.stringify(error));
  // }

  let filter = {};
  const { origin, destination, date } = req.query;

  if (req.query) {
    filter = { origin, destination, date };
  }

  try {
    const result = await getAllFlightsFromDb(filter);

    res.send(result);
  } catch (error) {
    res.send({ message: "Something Went Wrong" });
  }
};

const getUniqueAirlines = async (req, res) => {
  try {
    const result = await getAllAirelines();

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching unique airlines", error });
  }
};

const flightSearch = async (req, res) => {
  let filter = {};
  const {
    origin,
    destination,
    date,
    minPrice,
    maxPrice,
    minDuration,
    maxDuration,
    minSeats,
    maxSeats,
    airlines,
  } = req.query;

  if (origin) {
    filter.origin = { $regex: origin, $options: "i" };
  }
  if (destination) {
    filter.destination = { $regex: destination, $options: "i" };
  }

  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    filter.date = { $gte: startOfDay, $lt: endOfDay };
  }

  if (minPrice && maxPrice) {
    filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
  }

  if (minDuration && maxDuration) {
    filter.duration = {
      $gte: parseFloat(minDuration),
      $lte: parseFloat(maxDuration),
    };
  }

  if (minSeats && maxSeats) {
    filter.availableSeats = {
      $gte: parseInt(minSeats),
      $lte: parseInt(maxSeats),
    };
  }

  if (airlines) {
    filter.airline = { $in: airlines };
  }

  try {
    const result = await getAllFlightsFromDb(filter);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Something Went Wrong" });
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
    const result = await getAllFlightsFromDb({});
    res.send(result);
  } catch (error) {
    res.send({ message: "Something Went Wrong" });
  }
};
const getFlight = async (req, res) => {
  const id = req.params.id;

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
  try {
    const result = await updatFlightToDb(id, data);
    if (result.modifiedCount) {
      return res.send({ message: "Update Successfully" });
    } else {
      return res.send({ message: "Something Went Wrong" });
    }
  } catch (error) {
    return res.send({ message: "Something Went Wrong" });
  }
};

module.exports = {
  flightSearch,
  createFlight,
  getAllFlights,
  deleteFlightById,
  updateFlight,
  getFlight,
  getUniqueAirlines,
};
