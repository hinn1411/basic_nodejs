class CustomAPIError extends Error {
  constructor(_message, _statusCode) {
    super(_message);
    this.statusCode = _statusCode;
  }
}

const createCustomError = (message, statusCode) => {
  return new CustomAPIError(message, statusCode);
};

module.exports = {
  CustomAPIError,
  createCustomError,
};
