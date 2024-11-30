const { createBookingToDb } = require("../model/bookingsModel");

const createBookings = async (req, res) => {
  const data = req.body;

  try {
    const result = await createBookingToDb(data);
    if (result) {
      res.send({ message: "Booking Flight Successfully" });
    }
  } catch (error) {
    res.send({ message: "Something Went Wrong" });
  }
};

module.exports = { createBookings };
