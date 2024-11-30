const {
  createBookingToDb,
  getAllBookingsFromDb,
  getBookingsById,
} = require("../model/bookingsModel");

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

const getAllBookings = async (req, res) => {
  try {
    const result = await getAllBookingsFromDb();
    res.send(result);
  } catch (error) {
    res.send({ message: "Something Went Wrong" });
  }
};
const getBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await getBookingsById(id);
    res.send(result);
  } catch (error) {
    res.send({ message: "Something Went Wrong" });
  }
};
module.exports = { createBookings, getAllBookings, getBooking };
