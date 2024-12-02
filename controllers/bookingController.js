const { mszFormater } = require("../lib/mszFormater");
const { sendemail } = require("../lib/sendMail");
const {
  createBookingToDb,
  getAllBookingsFromDb,
  getBookingsById,
  deleteBookingToDb,
  updateBookingToDb,
} = require("../model/bookingsModel");

const createBookings = async (req, res) => {
  const data = req.body;

  try {
    const result = await createBookingToDb(data);
    if (result) {
      sendemail(data?.email, mszFormater(data));
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

const deleteBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await deleteBookingToDb(id);
    if (result.deletedCount) {
      res.send({ message: "Delete Booking Successfully" });
    } else {
      res.send({ message: "Something Went Wrong" });
    }
  } catch (error) {
    res.send({ message: "Something Went Wrong" });
  }
};

const updateBooking = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const result = await updateBookingToDb(id, data);
    if (result.modifiedCount) {
      let message = {};
      if (req.body.bookingStatus === "cancelled") {
        message.message = "Booking has been cancel";
      } else {
        message.message = "Booking has been delete successfully";
      }
      return res.send(message);
    } else {
      return res.send({ message: "Something Went Wrong" });
    }
  } catch (error) {
    return res.send({ message: "Something Went Wrong" });
  }
};
module.exports = {
  createBookings,
  getAllBookings,
  getBooking,
  deleteBooking,
  updateBooking,
};
