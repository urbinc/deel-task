const Sequelize = require('sequelize');

exports.db = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
});
