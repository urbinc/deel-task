const { fn, col, literal, Op } = require('sequelize');
const { Job, Contract, Profile } = require('../../models');

exports.getBestProfession = async (startDate, endDate) => {
  return await Profile.findAll({
    attributes: ['profession', [fn('sum', col('price')), 'income']],
    order: [[literal('income'), 'DESC']],
    group: ['Profile.profession'],
    limit: 1,
    where: {
      type: 'contractor',
    },
    include: [
      {
        model: Contract,
        as: 'Contractor',
        required: true,
        attributes: [],
        include: [
          {
            model: Job,
            required: true,
            attributes: [],
            where: {
              paid: true,
              paymentDate: { [Op.between]: [startDate, endDate] },
            },
          },
        ],
      },
    ],
    subQuery: false,
  });
};
