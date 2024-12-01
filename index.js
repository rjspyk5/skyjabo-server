const express = require("express");
const cors = require("cors");
const {
  register,
  login,
  logout,
  getUser,
} = require("./controllers/authController");
const connectDb = require("./config/db");
const { verifyToken } = require("./middlewares/authMiddlewares");
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
app.get("/user/:id", getUser);
app.get("/authstate", verifyToken, async (req, res) => res.send(req?.user));
// flights api
app.get("/flights/search", flightSearch);
app.get("/flight/:id", getFlight);
app.get("/flights", getAllFlights);
app.get("/admin/flight", getAllFlights);
app.post("/flights", createFlight);
app.post("/flights", createFlight);
app.delete("/flights/:id", deleteFlightById);
app.put("/flights/:id", updateFlight);
// bookings api
app.get("/booking/user/:id", getBooking);
app.post("/bookings", createBookings);

app.get("/bookings", getAllBookings);
app.delete("/bookings/:id", deleteBooking);
app.listen(port, () => console.log("server is running"));
