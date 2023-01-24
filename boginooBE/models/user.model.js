const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  createdAt: { default: Date.now(), type: Date },
});

const User = model("User", userSchema);

exports.User = User;
