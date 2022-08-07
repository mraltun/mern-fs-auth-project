const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");

app.use(cors());
app.use(express.json());

const DB = process.env.MONGO_DB;
mongoose.connect(DB);

const JWT_SECRET = process.env.JWT_SECRET;

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
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      JWT_SECRET
    );

    return res.json({ status: "ok", user: token });
  } else {
    res.json({ status: "error", user: false });
  }
});

app.get("/api/v1/quote", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;
    const user = await User.findOne({ email: email });

    return res.json({ status: "ok", quote: user.quote });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Invalid Token" });
  }
});

app.post("/api/v1/quote", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;
    await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });

    return { status: "ok" };
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Invalid Token" });
  }
});

app.listen(8000, () => {
  console.log("Server running on 8000");
});
