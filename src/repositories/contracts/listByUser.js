const { Op } = require('sequelize');
const { Contract } = require('../../models');

exports.listByUser = async (userId) => {
  return await Contract.findAll({
    where: {
      [Op.and]: {
        [Op.not]: { status: 'terminated' },
        [Op.or]: [{ ContractorId: userId }, { ClientId: userId }],
      },
    },
  });
};
