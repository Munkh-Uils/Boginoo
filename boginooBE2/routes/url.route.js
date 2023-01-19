const express = require("express");
const { getUrl, createUrl, getUrls } = require("../controllers/url.controller");

const router = express.Router();

router.get("/:id", getUrl).get("/", getUrls).post("/", createUrl);

module.exports = router;
