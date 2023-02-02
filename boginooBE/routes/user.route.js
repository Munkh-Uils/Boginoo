const express = require("express");
const { roleMiddleware } = require("../middleware/roleMiddleware");
const { getUsers, createUser } = require("../controllers/user.controller");
const { Verify, signup, login } = require("../controllers/auth.controller");

const router = express.Router();

router
  .get("/users", roleMiddleware, getUsers)
  .get("/verify", Verify)
  .post("/signup", signup)
  .post("/login", login)
  .post("/users", createUser);

module.exports.userRoutes = router;
