const router = require("express").Router();

const usersRouter = require("./users");
const itemRouter = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");
const { createUser, login } = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", createUser);

// Public route
router.use("/items", itemRouter);

// Protected route
router.use("/users", usersRouter);

// === TEMPORARY TEST ROUTE: add this BEFORE the not found handler ===
// router.get("/cause-error", (req, res, next) => {
//  next(new Error("This is a test error for winston error.log!"));
// });

// Not found handler
router.use((req, res) =>
  res.status(NOT_FOUND).json({ message: "Requested resource not found" })
);

module.exports = router;
