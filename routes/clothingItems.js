const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const {
  getClothingItems,
  createClothingItems,
  deleteClothingItems,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

const { validateCardBody, validateId } = require("../middlewares/validation");

router.get("/", getClothingItems);

router.post("/", authMiddleware, validateCardBody, createClothingItems);

router.delete(
  "/:itemId",
  authMiddleware,
  validateId("itemId"),
  deleteClothingItems
);

router.put("/:itemId/likes", authMiddleware, validateId("itemId"), likeItem);

router.delete(
  "/:itemId/likes",
  authMiddleware,
  validateId("itemId"),
  dislikeItem
);

module.exports = router;
