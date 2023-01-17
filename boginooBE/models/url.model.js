const { Schema, model } = require("mongoose");
const shortid = require("shortid");
const shortId = require("shortid")

const redirectSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortid.generate
  },
});

const Redirect = model("Redirect", redirectSchema);

module.exports = Redirect;
