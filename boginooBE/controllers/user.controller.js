const { User } = require("../models/user.model");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return res.send({error});
  }
};
const createUser = async (req, res) => {
  const body = req.body;

  if (!body) return res.send("username, password and email is required");

  try {
    const result = await User.create(body);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getUsers, createUser };
