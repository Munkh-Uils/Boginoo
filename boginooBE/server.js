const express = require("express");
const cors = require("cors");
const connect = require("./config/database");
const router = require("./routes/url.route");
const user = require("./routes/user.route");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

connect();

app.use(router);
app.use(user);

app.get("/", (req, res) => {
  res.send("I AM DUCK");
});

app.listen(port, () => {
  console.log("Server running at:", port);
});
