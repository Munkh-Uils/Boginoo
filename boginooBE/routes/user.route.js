const express = require("express");
const { roleMiddleware } = require("../middleware/roleMiddleware");
const { getUsers, createUser } = require("../controllers/user.controller");

const router = express.Router();

router.get("/users", roleMiddleware, getUsers).post("/users", createUser);

module.exports = router;
