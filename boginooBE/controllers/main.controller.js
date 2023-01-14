const Redirect = require("../models/url.model");

const generate = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    const redirect = await Redirect.create({ url });
    res.status(201).json(redirect);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error, try again");
  }
};

const redirect = async (req, res) => {
  const { id } = req.params;

  try {
    const redirect = await Redirect.findById(id);

    if (!redirect) {
      return res.status(404).send("Redirect not found");
    }

    const { url } = redirect;

    res.redirect(url);
  } catch (error) {
    res.status(500).send("Error, try again");
  }
};

module.exports = { generate, redirect };
