const { AppError } = require('./AppError');

class NotFoundError extends AppError {
  constructor(options) {
    super(404, 'Not Found', options);
  }
}

exports.NotFoundError = NotFoundError;
