const { Router } = require("express");
const { generate, redirect } = require("../controllers/main.controller");

const router = Router();

router
    .get("/:id", redirect)
    .post("/", generate);

module.exports = router;
