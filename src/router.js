const express = require('express');

const router = new express.Router();

router.use(require('./api/admin/best-clients').router);
router.use(require('./api/admin/best-profession').router);
router.use(require('./api/balances/deposit/[userId]').router);
router.use(require('./api/contracts/[id]').router);
router.use(require('./api/contracts').router);
router.use(require('./api/jobs/[jobId]/pay').router);
router.use(require('./api/jobs/unpaid').router);

exports.router = router;
