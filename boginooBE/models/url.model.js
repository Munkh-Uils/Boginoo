const { Schema, model } = require("mongoose");

const redirectSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
});

const Redirect = model("Redirect", redirectSchema);

module.exports = Redirect;
