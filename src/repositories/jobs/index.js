exports.Jobs = {
  ...require('./getById'),
  ...require('./getUnpaidByUser'),
  ...require('./doPayment'),
  ...require('./getUnpaidAmountByUser'),
};
