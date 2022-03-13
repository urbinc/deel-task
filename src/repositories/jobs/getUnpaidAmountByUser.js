const { Op, fn, col } = require('sequelize');
const { Job, Contract } = require('../../models');

exports.getUnpaidAmountByUser = async (userId) => {
  const paidJobs = await Job.findOne({
    attributes: [[fn('sum', col('price')), 'unpaidAmount']],
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

  return paidJobs.get('unpaidAmount');
};
