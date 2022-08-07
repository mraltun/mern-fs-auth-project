const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

const DB = process.env.MONGO_DB;
mongoose.connect(DB);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.post("/api/v1/register", (req, res) => {
  res.json({ status: "okay" });
});

app.listen(8000, () => {
  console.log("Server running on 8000");
});
