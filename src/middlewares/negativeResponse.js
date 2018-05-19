export default (error, req, res, next) => {
  if (error.isBoom) {
    const boomError = error.output;

    return res
      .status(boomError.statusCode || 500)
      .json(Object.assign(
        boomError.payload,
        error.data ? { details: error.data } : null
      ));
  }
  res.status(error.status || 500).json({
    statusCode: error.status || 500,
    error: error.name,
    message: error.message,
  });
};
