const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/userModel");

app.use(cors());
app.use(express.json());

const DB = process.env.MONGO_DB;
mongoose.connect(DB);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.post("/api/v1/register", async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", err });
  }
});

app.post("/api/v1/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    return res.json({ status: "ok", user: true });
  } else {
    res.json({ status: "error", user: false });
  }
});

app.listen(8000, () => {
  console.log("Server running on 8000");
});
