//const router = require("express").Router();
//const { validateUserInfo } = require("../middlewares/validation");
const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUser,
  getCurrentUser,
  updateCurrentUser,
} = require("../controllers/users");

// Routes
router.get("/", getUsers);
router.post("/", createUser);

router.get("/me", getCurrentUser);
router.patch("/me", updateCurrentUser);

router.get("/:userId", getUser); // must come after /me

module.exports = router;
