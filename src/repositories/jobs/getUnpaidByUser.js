const { Op } = require('sequelize');
const { Job, Contract } = require('../../models');

exports.getUnpaidByUser = async (userId) => {
  return await Job.findAll({
    where: {
      [Op.and]: [
        { paid: { [Op.not]: true } },
        {
          [Op.or]: [
            { '$Contract.ContractorId$': userId },
            { '$Contract.ClientId$': userId },
          ],
        },
      ],
    },
    include: {
      model: Contract,
      required: false,
      attributes: [],
    },
  });
};
