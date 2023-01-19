const Redirect = require("../models/url.model");

const generate = async (req, res) => {

  if (!url) {
    return res.status(400).send("URL is required");
  }

  try {
    const redirect = await Redirect.create({ url });
    res.send(redirect);
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
    res.redirect(redirect.url);
  } catch (error) {
    res.status(500).send("Error, try again");
  }
};

// app.get("/", async (req, res) => {
//   const short = req.params.id;

//   const resUrl = await Redirect.findById(short)

//   if (shortUrl === null) return res.sendStatus(404);
//   res.redirect(resUrl.url)
// });
module.exports = { generate, redirect };
