const express = require('express');
const yup = require('yup');
const { validate } = require('../../../middleware/validate');
const { Jobs } = require('../../../repositories/jobs');
const { AppError } = require('../../../errors/AppError');
const { NotFoundError } = require('../../../errors/NotFoundError');

const router = express.Router();

const schema = yup.object().shape({
  params: yup.object().shape({
    jobId: yup.number().positive(),
  }),
});

router.post('/jobs/:jobId/pay', validate(schema), async (req, res, next) => {
  const { jobId } = req.params;
  const job = await Jobs.getById(jobId);

  if (!job) {
    throw NotFoundError();
  }

  const contract = await job.getContract();

  if (contract.ClientId !== req.profile.id) {
    return next(new AppError(403, 'Not enough funds'));
  }

  if (job.paid) {
    // Already paid -> no op
    return res.status(200).end();
  }

  if (job.price > req.profile.balance) {
    return next(new AppError(402, 'Not enough funds'));
  }

  await Jobs.doPayment({
    job,
    contractor: await contract.getContractor(),
    client: req.profile,
  });

  res.status(200).end();
});

exports.router = router;
