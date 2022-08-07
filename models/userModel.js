const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: { type: String, required },
    email: { type: String, unique, required },
    password: { type: String, required },
    quote: { type: String },
  },
  { collection: "users" }
);

const model = mongoose.model("User", User);

module.exports = model;
