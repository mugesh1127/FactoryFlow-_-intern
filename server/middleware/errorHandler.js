
function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.originalUrl}`
  });
}

function errorHandler(err, req, res, next) {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
}

module.exports = {
  notFound,
  errorHandler
};
