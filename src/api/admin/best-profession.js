const express = require('express');
const yup = require('yup');

const { validate } = require('../../middleware/validate');
const { Profiles } = require('../../repositories/profiles');

const router = express.Router();

const schema = yup.object().shape({
  queryParams: yup.object().shape({
    start: yup.date().required().max(yup.ref('end')),
    end: yup.date().required(),
  }),
});

router.get('/admin/best-profession', validate(schema), async (req, res) => {
  const {
    queryParams: { start, end },
  } = schema.cast({ queryParams: req.query });

  const bestProfessions = await Profiles.getBestProfession(start, end);

  res.json(bestProfessions[0] || null);
});

exports.router = router;
