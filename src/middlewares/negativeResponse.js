const DEFAULT_ERROR_STATUS = 400;
const DEFAULT_MESSAGE = 'Bad request';

const enviroment = process.env.NODE_ENV || 'development';

export default (error, req, res, next) => {
  if (error) {
    const status = (error.isBoom ? error.output.statusCode : error.status) || DEFAULT_ERROR_STATUS;
    const message = (error.isBoom ? error.output.payload.message : error.message) || error;

    return send(res, status, getErrorObject(status, message, error));
  }

  return send(res, DEFAULT_ERROR_STATUS, getErrorObject(DEFAULT_ERROR_STATUS, DEFAULT_MESSAGE));
};

function getErrorObject(status, message, originalObject) {
  const errorObject = {
    code: status,
    message,
  };

  if (enviroment === 'development') {
    errorObject.error = originalObject;
  }

  return errorObject;
}

function send(res, status, errorObject) {
  res.status(status).json(errorObject);
}
