const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  createdAt: { default: Date.now(), type: Date },
  roles: {
    type: Array,
    default : ["user"],
  },
});

const User = model("User", userSchema);

exports.User = User;
