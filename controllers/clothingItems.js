const mongoose = require("mongoose");
const Item = require("../models/clothingItems");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  DEFAULT_SERVER_ERROR_MESSAGE,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
} = require("../utils/errors");

const getItems = (req, res) => {
  Item.find({})
    .then((items) => res.status(200).send({ data: items }))
    .catch((err) => {
      console.error(err);
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: DEFAULT_SERVER_ERROR_MESSAGE });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  Item.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: DEFAULT_SERVER_ERROR_MESSAGE });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  Item.findByIdAndDelete(itemId)

    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: NOT_FOUND_MESSAGE });
      }
      return res.status(200).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: DEFAULT_SERVER_ERROR_MESSAGE });
    });
};

const likeItem = (req, res) => {
  const userId = req.user._id;
  const itemId = req.params.itemId;

  console.log("Trying to like item:", itemId);

  // First check if the item exists
  Item.findById(itemId)
    .then((item) => {
      if (!item) {
        console.log(`Item ${itemId} not found`);
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }

      console.log(`Item found with name: ${item.name}`);

      // Update the item with the like
      return Item.findByIdAndUpdate(
        itemId,
        { $addToSet: { likes: userId } },
        { new: true }
      ).then((updatedItem) => {
        console.log("Item successfully updated");
        return res.status(200).send({ data: updatedItem });
      });
    })
    .catch((err) => {
      console.error("Error:", err.message);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid ID format" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
    });
};

const dislikeItem = (req, res) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail(new Error("NotFound"))
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
      }
      if (err.message === "NotFound") {
        return res.status(NOT_FOUND).send({ message: NOT_FOUND_MESSAGE });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: DEFAULT_SERVER_ERROR_MESSAGE });
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
