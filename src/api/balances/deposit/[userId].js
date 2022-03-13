const express = require('express');
const yup = require('yup');
const { AppError } = require('../../../errors/AppError');
const { validate } = require('../../../middleware/validate');
const { Jobs } = require('../../../repositories/jobs');
const { Profiles } = require('../../../repositories/profiles');
const { NotFoundError } = require('../../../errors/NotFoundError');

const router = express.Router();

const schema = yup.object().shape({
  params: yup.object().shape({
    userId: yup.number().positive(),
  }),
  body: yup.object().shape({
    amount: yup.number().positive().required(),
  }),
});

// I'm assuming you need to send an amount in the body of the request and
// add that value to a client's balance.
router.post(
  '/balances/deposit/:userId',
  validate(schema),
  async (req, res, next) => {
    const { userId } = req.params;
    const { amount } = req.body;
    const client = await Profiles.getById(userId);

    if (!client) {
      return next(new NotFoundError());
    }

    if (client.type !== 'client') {
      return next(new AppError(400, 'Target profile must be a client'));
    }

    const unpaidAmount = await Jobs.getUnpaidAmountByUser(userId);
    const maxAmount = unpaidAmount * 0.25;

    if (amount > maxAmount) {
      return next(
        new AppError(
          400,
          `Can't deposit more than 25% of the client's unpaid jobs: ${maxAmount}`
        )
      );
    }

    await Profiles.addBalance(client, amount);

    res.status(200).send();
  }
);

exports.router = router;
