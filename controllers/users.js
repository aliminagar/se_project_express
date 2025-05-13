const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST_MESSAGE,
  DEFAULT_SERVER_ERROR_MESSAGE,
} = require("../utils/errors");

// GET /users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      res.status(INTERNAL_SERVER_ERROR).send({ message: DEFAULT_SERVER_ERROR_MESSAGE });
    });
};

// POST /users
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: DEFAULT_SERVER_ERROR_MESSAGE });
    });
};

// GET /users/:userId
const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(new Error("NotFound"))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.message === "NotFound") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid user ID" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: DEFAULT_SERVER_ERROR_MESSAGE });
    });
};

// GET /users/me
const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(new Error("NotFound"))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.message === "NotFound") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: DEFAULT_SERVER_ERROR_MESSAGE });
    });
};

// PATCH /users/me
const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(new Error("NotFound"))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.message === "NotFound") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: DEFAULT_SERVER_ERROR_MESSAGE });
    });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  getCurrentUser,
  updateCurrentUser,
};
