const express = require("express");
const cors = require("cors");
const { register, login, logout } = require("./controllers/authController");
const connectDb = require("./config/db");
const { verifyToken } = require("./middlewares/authMiddlewares");
const cookieParser = require("cookie-parser");
const {
  flightSearch,
  createFlight,
  getAllFlights,
} = require("./controllers/flightsController");

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

//public
app.get("/", (req, res) => res.send("Test"));
app.post("/register", register);
app.post("/login", login);
app.post("/logout", logout);
app.get("/authstate", verifyToken, async (req, res) => res.send(req?.user));
app.get("/flights/search", flightSearch);
app.post("/flights", createFlight);
app.get("/flights/adminadded", getAllFlights);

// protected

// protected+admin only
app.listen(port, () => console.log("server is running"));
