const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, password, email, roles } = req.body;

  if (!username || !password || !email) {
    return res.send("username, password and email is required");
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const userDocument = new User({
      username,
      password: encryptedPassword,
      email,
      roles,
    });
    const user = await userDocument.save();
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};
const login = async (req, res) => {
  const { username, password,  } = req.body;

  if (!username || !password)
    return res.send("username and password is required");

  try {
    const user = await User.findOne({ username });
    const token = jwt.sign(
      { username, password,  },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    const isEqual = await bcrypt.compare(password, user.password);
    if (isEqual) return res.send(token);

    res.send("Your password is incorrect");
  } catch (error) {
    throw res.send("User not found");
  }
};

module.exports = { signup, login };