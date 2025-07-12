const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(requestLogger); // <--- 1. Log all requests (FIRST)
app.use("/", mainRouter); // <--- 2. Your routes

app.use(errorLogger); // <--- 3. Log all errors (AFTER routes, BEFORE error handlers)
app.use(errors()); // <--- 4. Celebrate error handler
app.use(errorHandler); // <--- 5. Custom error handler

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
