const Url = require("../models/url.model");
const { User } = require("../models/user.model");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return res.send({ error });
  }
};
const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.send(user);
  } catch (error) {
    res.status(500).send("Error, try again");
  }
};
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await User.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {}
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

module.exports = { getUsers, createUser, getUser, deleteUser };
