const express = require('express');
const { Jobs } = require('../../repositories/jobs');

const router = express.Router();

router.get('/jobs/unpaid', async (req, res) => {
  const jobs = await Jobs.getUnpaidByUser(req.profile.id);

  res.json(jobs);
});

exports.router = router;
