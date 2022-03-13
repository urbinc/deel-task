const { Contract } = require('../../models');

exports.getById = async (id) => {
  return await Contract.findOne({ where: { id } });
};
