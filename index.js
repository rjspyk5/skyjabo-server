const express = require("express");
const cors = require("cors");
const { register, login } = require("./controllers/authController");
const connectDb = require("./config/db");

const app = express();
const port = process.env.PORT ?? 5000;
require("dotenv").config();
// connect Database
connectDb();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    credentials: true,
  })
);

// routes
app.get("/", (req, res) => res.send("Test"));
app.post("/register", register);
app.post("/login", login);
app.listen(port, () => console.log("server is running"));
