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
const {
  verifyToken,
  verifyAdmin,
  isLogin,
} = require("./middlewares/authMiddlewares");
const cookieParser = require("cookie-parser");
const {
  flightSearch,
  createFlight,
  getAllFlights,
  deleteFlightById,
  updateFlight,
  getFlight,
  getUniqueAirlines,
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
const port = process.env.PORT ?? 3000;

// connect Database
connectDb();
app.use(
  cors({
    origin: [
      "https://skyjabo.web.app",
      "https://skyjabo.firebaseapp.com",
      "https://creative-sherbet-a37e62.netlify.app",
      "http://localhost:5173",
    ],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

// middleware
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => res.send("Test"));
// auth api
app.post("/register", register);
app.post("/login", login);
app.post("/logout", logout);
app.get("/user/:id", verifyToken, getUser);
app.put("/user/:id", verifyToken, updateUser);
app.get("/authstate", isLogin, async (req, res) => res.send(req?.user));
// flights api
app.get("/flights/search", flightSearch);
app.get("/airlines", getUniqueAirlines);
app.get("/flight/:id", getFlight);
app.get("/flights", getAllFlights);
app.get("/admin/flight", verifyToken, verifyAdmin, getAllFlights);
app.post("/flights", verifyToken, verifyAdmin, createFlight);
app.delete("/flights/:id", verifyToken, verifyAdmin, deleteFlightById);
app.put("/flights/:id", verifyToken, verifyAdmin, updateFlight);
// bookings api
app.get("/booking/user/:id", verifyToken, getBooking);
app.get("/bookings", verifyToken, verifyAdmin, getAllBookings);
app.post("/bookings", verifyToken, createBookings);
app.put("/bookings/:id", verifyToken, verifyAdmin, updateBooking);
app.put("/booking/cancel/:id", verifyToken, updateBooking);
app.delete("/bookings/:id", verifyToken, verifyAdmin, deleteBooking);
app.listen(port, () => console.log("server is running"));
