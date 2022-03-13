const { Profile } = require('../../models');

exports.getById = async (id) => {
  return await Profile.findOne({ where: { id } });
};
