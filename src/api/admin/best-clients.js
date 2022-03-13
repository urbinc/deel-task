const express = require('express');
const yup = require('yup');

const { validate } = require('../../middleware/validate');
const { Profiles } = require('../../repositories/profiles');

const router = express.Router();

const schema = yup.object().shape({
  queryParams: yup.object().shape({
    start: yup.date().required().max(yup.ref('end')),
    end: yup.date().required(),
    limit: yup.number().default(2),
  }),
});

router.get('/admin/best-clients', validate(schema), async (req, res) => {
  const {
    queryParams: { start, end, limit },
  } = schema.cast({ queryParams: req.query });

  const bestClients = await Profiles.getClientsByExpenditure(start, end, limit);

  res.json({ bestClients });
});

exports.router = router;
