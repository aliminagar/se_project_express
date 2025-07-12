const {
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  UNAUTHORIZED,
  FORBIDDEN,
} = require("../utils/errors");

const handleError = (err, req, res, _next) => {
  console.error(err);

  if (err.name === "DocumentNotFoundError") {
    return res.status(NOT_FOUND).send({ message: "Not found" });
  }

  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).send({ message: "Invalid ID" });
  }

  if (err.name === "ValidationError") {
    return res
      .status(BAD_REQUEST)
      .send({ message: err.message || "Invalid data provided" });
  }

  if (err.code === 11000) {
    // Mongo duplicate key error
    return res.status(CONFLICT).send({ message: "Resource already exists" });
  }

  if (err.name === "UnauthorizedError") {
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Authentication required" });
  }

  if (err.name === "ForbiddenError") {
    return res
      .status(FORBIDDEN)
      .send({ message: "You don't have permission to perform this action" });
  }

  // If the error has a statusCode, use it
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  // Fallback: Internal Server Error
  return res.status(INTERNAL_SERVER_ERROR).send({
    message: "An unexpected error occurred on the server",
  });
};

module.exports = handleError;
