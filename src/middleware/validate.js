const { AppError } = require('../errors/AppError');

exports.validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validate({
        queryParams: req.query,
        params: req.params,
        body: req.body,
      });
    } catch (err) {
      return next(
        new AppError(400, 'Validation error', {
          details: err.message,
          cause: err,
        })
      );
    }

    return next();
  };
};
