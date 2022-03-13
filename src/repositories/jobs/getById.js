const { Job } = require('../../models');

exports.getById = async (id) => {
  return await Job.findOne({ where: { id } });
};
