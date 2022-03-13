const express = require('express');
const { Contracts } = require('../../repositories/contracts');

const router = express.Router();

router.get('/contracts', async (req, res) => {
  const contracts = await Contracts.listByUser(req.profile.id);

  res.json(contracts);
});

exports.router = router;
