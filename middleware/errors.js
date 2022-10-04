const ErrorHandler = require("../utils/errorhandler");
const errorFormatter = require("../utils/errorFormatter");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "ValidationError") {
    const message = errorFormatter(err);
    err = message;
    res.status(400).json({
      success: false,
      message: err,
    });
  } else {
    // Wrong Mongodb Id error
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
};
