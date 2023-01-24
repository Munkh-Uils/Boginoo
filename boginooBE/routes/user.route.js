const express = require("express");
const { getUsers, createUser } = require("../controllers/user.controller");

const router = express.Router();

router.get("/users", getUsers).post("/users", createUser);

module.exports = router;
