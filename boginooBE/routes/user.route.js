const express = require("express");
const { roleMiddleware } = require("../middleware/roleMiddleware");
const {
  getUsers,
  createUser,
  getUser,
  deleteUser,
} = require("../controllers/user.controller");
const { Verify, signup, login } = require("../controllers/auth.controller");

const router = express.Router();

router
  .get("/users", roleMiddleware, getUsers)
  .get("/users/:id", getUser)
  .get("/verify", Verify)
  .post("/signup", signup)
  .post("/login", login)
  .delete("/users/:id", deleteUser)

module.exports.userRoutes = router;
