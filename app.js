const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const auth = require("./middlewares/auth");
const mainRouter = require("./routes/index");
const { login, createUser } = require("./controllers/users");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

app.use(cors());
app.use(express.json());

//  Public routes
app.post("/signin", login);
app.post("/signup", createUser);

// Protect all routes below this point
app.use(auth);

// Routes that require authentication
app.use("/", mainRouter);

// Fallback route for unknown endpoints (must be last!)
app.use((req, res) => {
  res.status(404).json({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
