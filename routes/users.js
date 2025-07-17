const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateProfileUpdate } = require("../middlewares/validation");

// Authenticated routes only
router.get("/me", authMiddleware, getCurrentUser);
router.patch("/me", authMiddleware, validateProfileUpdate, updateUser);

module.exports = router;
