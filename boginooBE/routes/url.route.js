const express = require("express");
const { getUrl, createUrl, getUrls } = require("../controllers/url.controller");

const router = express.Router();

router.get("/url/:id", getUrl).get("/url", getUrls).post("/url", createUrl);

module.exports.urlRoutes = router;
