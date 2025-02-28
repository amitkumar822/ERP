import { ApiError } from "../../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    // Extract only error messages from validation errors
    const validationMessages = Object.values(err.errors).map(
      (error) => error.message
    );

    res.status(400).json({
      success: false,
      statusCode: 400,
      message: validationMessages.join(", "),
      errors: validationMessages,
    });
  } else if (err instanceof ApiError) {
    // Check if the error is an instance of ApiError
    res.status(err.statusCode || 500).json({
      success: err.success,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
    });
  } else {
    // Handle other errors not thrown with ApiError
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
      errors: [err.message],
    });
  }
};

export default errorHandler;
