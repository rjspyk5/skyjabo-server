const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT ?? 5000;
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => res.send("Test"));
app.listen(port, () => console.log("server is running"));
