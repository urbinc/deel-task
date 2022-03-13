const { AppError } = require('../errors/AppError');

const isProd = process.env.NODE_ENV === 'production';

exports.errorHandler = async (err, req, res, next) => {
  console.log('CATCH');
  const isAppError = err instanceof AppError;
  const error = { msg: err.message };
  const status = isAppError && err.status ? err.status : 500;

  if (isAppError) {
    error.details = err.details;

    if (!isProd && err.cause) {
      error.cause = err.cause;
    }
  }

  res.status(status || 500).json({ error });

  if (!isAppError || !err.isExpected) {
    console.error(err);
  }

  return next();
};
