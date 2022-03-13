const Sequelize = require('sequelize');
const { db } = require('../db');

class Contract extends Sequelize.Model {}

Contract.init(
  {
    terms: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('new', 'in_progress', 'terminated'),
    },
  },
  {
    sequelize: db,
    modelName: 'Contract',
  }
);

exports.Contract = Contract;
