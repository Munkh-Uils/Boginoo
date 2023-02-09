const Url = require("../models/url.model");

const createUrl = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).send("URL is required");
  }

  try {
    const result = await Url.create(body);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error, try again");
  }
};

const getUrls = async (req, res) => {
  const result = await Url.find({});
  res.send(result);
};

const getUrl = async (req, res) => {
  const id = req.params.id;

  try {
    const redirect = await Url.findOne({ short: id });
    res.redirect(redirect.url);
  } catch (error) {
    res.status(500).send("Error, try again");
  }
};

const deleteUrl = async (req, res) => {
  const id = req.params.id;
  const result = await Url.findByIdAndDelete(id);
  res.send(result);
}

module.exports = { createUrl, getUrls, getUrl, deleteUrl };
