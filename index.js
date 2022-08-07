const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.post("/api/v1/register", (req, res) => {
  res.json({ status: "okay" });
});

app.listen(8000, () => {
  console.log("Server running on 8000");
});
