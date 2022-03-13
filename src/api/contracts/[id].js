const express = require('express');
const yup = require('yup');
const { AppError } = require('../../errors/AppError');
const { NotFoundError } = require('../../errors/NotFoundError');
const { validate } = require('../../middleware/validate');
const { Contracts } = require('../../repositories/contracts');

const router = express.Router();

const schema = yup.object().shape({
  params: yup.object().shape({
    id: yup.number().positive(),
  }),
});

router.get('/contracts/:id', validate(schema), async (req, res, next) => {
  const { id } = req.params;
  const contract = await Contracts.getById(id);

  if (!contract) {
    return next(new NotFoundError());
  }

  if (
    contract.ContractorId !== req.profile.id &&
    contract.ClientId !== req.profile.id
  ) {
    return next(new AppError(403, 'Not your contract'));
  }

  res.json(contract);
});

exports.router = router;
