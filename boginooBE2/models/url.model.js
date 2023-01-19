const { Schema, model } = require("mongoose");
const shortid = require("shortid");

const urlSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    unique: true,
    default: shortid.generate
  },
});

const Url = model("Url", urlSchema);

module.exports = Url;
