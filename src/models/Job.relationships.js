const { Job } = require('./Job.model');
const { Contract } = require('./Contract.model');

Job.belongsTo(Contract);
