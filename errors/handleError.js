const {
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  UNAUTHORIZED,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

// Express error handling middleware
// (err, req, res, next) signature is REQUIRED for Express to recognize it
const handleError = (err, req, res, next) => {
  console.error(err);

  // Handle Mongoose Document Not Found
  if (err.name === "DocumentNotFoundError") {
    return res
      .status(NOT_FOUND)
      .send({ message: "Requested resource not found" });
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).send({ message: "Invalid ID format" });
  }

  // Handle Mongoose ValidationError
  if (err.name === "ValidationError") {
    return res
      .status(BAD_REQUEST)
      .send({ message: err.message || "Validation failed" });
  }

  // Handle MongoDB duplicate key error (e.g., email conflict)
  if (err.code === 11000) {
    return res.status(CONFLICT).send({ message: "Resource already exists" });
  }

  // If custom error class with statusCode
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  // Handle JWT UnauthorizedError (optional, if you use JWT middleware)
  if (err.name === "UnauthorizedError") {
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }

  // Handle ForbiddenError (optional, if you create/use it)
  if (err.name === "ForbiddenError") {
    return res.status(FORBIDDEN).send({ message: "Forbidden" });
  }

  // Fallback: Internal server error
  return res.status(INTERNAL_SERVER_ERROR).send({
    message: "An error occurred on the server",
  });
};

module.exports = handleError;
