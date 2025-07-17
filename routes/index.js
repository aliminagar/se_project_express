const router = require("express").Router();
const usersRouter = require("./users");
const itemRouter = require("./clothingItems");
const { validateLogin, validateSignup } = require("../middlewares/validation");
const { createUser, login } = require("../controllers/users");
const NotFoundError = require("../errors/NotFoundError");

// Auth routes
router.post("/signin", validateLogin, login);
router.post("/signup", validateSignup, createUser);

// Public routes
router.use("/items", itemRouter);

// Protected routes
router.use("/users", usersRouter);

// Unknown route handler
router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
