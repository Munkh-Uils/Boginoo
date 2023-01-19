const express = require("express");
const { getUsers, createUser } = require("../controllers/user.controller");

exports.router = express.Router();

router.get("/users", getUsers).post("/users", createUser);
