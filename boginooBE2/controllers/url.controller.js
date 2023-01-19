const Url = require("../models/url.model");

const createUrl = async (req, res) => {
  const body = req.body;
  const result = await new Url(body).save();
  res.send(result);
};

const getUrls = async (req, res) => {
  const result = await Url.find({});
  res.send(result);
};

const getUrl = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Url.findById(id);
    res.send(result.id);
  } catch (error) {
    res.status(500).send("Error, try again");
  }
};

module.exports = { createUrl, getUrls, getUrl };
