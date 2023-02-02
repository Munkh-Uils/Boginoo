const express = require("express");
const cors = require("cors");
const connect = require("./config/database");
const url = require("./routes/url.route");
const user = require("./routes/user.route");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 8000;

connect();

app.use(cors());
app.use(express.json());

app.use(user.userRoutes);
app.use(url.urlRoutes);

app.get("/", (_req, res) => {
  res.send("I AM DUCK");
});

app.listen(port, () => {
  console.log("Server running at:", port);
});
