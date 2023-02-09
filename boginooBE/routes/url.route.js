const express = require("express");
const {
  getUrl,
  createUrl,
  getUrls,
  deleteUrl,
} = require("../controllers/url.controller");

const router = express.Router();

router
  .get("/url/:id", getUrl)
  .get("/url", getUrls)
  .post("/url", createUrl)
  .delete("/url/:id", deleteUrl);

module.exports.urlRoutes = router;
