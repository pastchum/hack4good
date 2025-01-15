exports.globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  };
  