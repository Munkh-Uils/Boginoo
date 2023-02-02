const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password) {
    return res.send("username, password and email is required");
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const userDocument = new User({
      username,
      password: encryptedPassword,
      roles,
    });
    const user = await userDocument.save();
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.log(403);
    // res.send("username, password and email is required");
  }
  try {
    const user = await User.findOne({ username });
    // const roles = Object.values(user.roles);

    const isEqual = await bcrypt.compare(password, user.password);

    if (isEqual) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      return res.send(token);
    } else {
      console.log(403);
    }
    // res.send("Your password is incorrect");
  } catch (error) {
    console.log(403);
    // res.send("User not found");
  }
};

const Verify = (req, res) => {
  console.log(req.headers);
  try {
    const token = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    console.log(token);
    res.send({token});
  } catch (error) {
    res.send(error);
  }
};

module.exports = { signup, login, Verify };
