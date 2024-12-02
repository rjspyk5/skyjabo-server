const express = require("express");
const cors = require("cors");
const {
  register,
  login,
  logout,
  getUser,
  updateUser,
} = require("./controllers/authController");
const connectDb = require("./config/db");
const { verifyToken, verifyAdmin } = require("./middlewares/authMiddlewares");
const cookieParser = require("cookie-parser");
const {
  flightSearch,
  createFlight,
  getAllFlights,
  deleteFlightById,
  updateFlight,
  getFlight,
} = require("./controllers/flightsController");
const {
  createBookings,
  getAllBookings,
  getBooking,
  deleteBooking,
  updateBooking,
} = require("./controllers/bookingController");

require("dotenv").config();

const app = express();
const port = process.env.PORT ?? 5000;

// connect Database
connectDb();

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
  })
);
//

app.get("/", (req, res) => res.send("Test"));
// auth api
app.post("/register", register);
app.post("/login", login);
app.post("/logout", logout);
app.get("/user/:id", verifyToken, getUser);
app.put("/user/:id", verifyToken, updateUser);
app.get("/authstate", verifyToken, async (req, res) => res.send(req?.user));
// flights api
app.get("/flights/search", flightSearch);
app.get("/flight/:id", getFlight);
app.get("/flights", getAllFlights);
app.get("/admin/flight", verifyToken, verifyAdmin, getAllFlights);
app.post("/flights", verifyToken, verifyAdmin, createFlight);

app.delete("/flights/:id", verifyToken, verifyAdmin, deleteFlightById);
app.put("/flights/:id", verifyToken, verifyAdmin, updateFlight);
// bookings api
app.get("/booking/user/:id", verifyToken, getBooking);
app.post("/bookings", verifyToken, createBookings);
app.put("/booking/cancel/:id", verifyToken, updateBooking);
app.get("/bookings", verifyToken, verifyAdmin, getAllBookings);
app.delete("/bookings/:id", verifyToken, verifyAdmin, deleteBooking);
app.listen(port, () => console.log("server is running"));
