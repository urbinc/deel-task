const { fn, col, literal, Op } = require('sequelize');
const { Job, Contract, Profile } = require('../../models');

exports.getClientsByExpenditure = async (startDate, endDate, limit) => {
  return await Profile.findAll({
    attributes: [
      'id',
      [literal('firstName || " " || lastName'), 'fullName'],
      [fn('sum', col('price')), 'paid'],
    ],
    order: [[literal('paid'), 'DESC']],
    group: ['Profile.id'],
    limit,
    where: {
      '$Profile.type$': 'client',
    },
    include: [
      {
        model: Contract,
        as: 'Client',
        required: true,
        attributes: [],
        include: [
          {
            model: Job,
            where: {
              paid: true,
              paymentDate: { [Op.between]: [startDate, endDate] },
            },
            attributes: [],
            required: true,
          },
        ],
      },
    ],
    subQuery: false,
  });
};
