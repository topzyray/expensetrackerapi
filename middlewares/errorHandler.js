const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    error: message,
    statusCode,
  });
};

export default errorHandler;
