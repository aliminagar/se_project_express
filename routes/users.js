const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const { getCurrentUser, updateUser } = require("../controllers/users");
const { registerUser, loginUser } = require("../controllers/auth");
const {
  validateSignup,
  validateLogin,
  validateProfileUpdate,
} = require("../middlewares/validation");

// Public (no auth required)
router.post("/signup", validateSignup, registerUser);
router.post("/signin", validateLogin, loginUser);

// Authenticated routes
router.get("/me", authMiddleware, getCurrentUser);
router.patch("/me", authMiddleware, validateProfileUpdate, updateUser);

module.exports = router;
