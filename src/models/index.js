exports.Contract = require('./Contract.model').Contract;
exports.Profile = require('./Profile.model').Profile;
exports.Job = require('./Job.model').Job;

require('./Contract.relationships');
require('./Job.relationships');
require('./Profile.relationships');
