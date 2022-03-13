class AppError extends Error {
  constructor(status, message, { isExpected = true, details, cause } = {}) {
    super(message);
    this.isExpected = isExpected;
    this.details = details;
    this.cause = cause;
    this.status = status;
  }
}

exports.AppError = AppError;
