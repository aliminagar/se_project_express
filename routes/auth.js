const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/auth"); // <== Next step!
const { validateSignup, validateLogin } = require("../middlewares/validation");

// Public registration route (no auth middleware!)
router.post("/signup", validateSignup, registerUser);

// Public login route (no auth middleware!)
router.post("/signin", validateLogin, loginUser);

module.exports = router;
