export default (req, res) => {
  res.status(404).json({
    statusCode: 404,
    error: 'Not Found',
    message: 'No such route',
  });
};
