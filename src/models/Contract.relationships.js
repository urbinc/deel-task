const { Job } = require('./Job.model');
const { Contract } = require('./Contract.model');
const { Profile } = require('./Profile.model');

Contract.belongsTo(Profile, { as: 'Contractor' });
Contract.belongsTo(Profile, { as: 'Client' });
Contract.hasMany(Job);
