const Sequelize = require('sequelize');

const sequelize = new Sequelize('meinWorterbuch', 'postgres', 'alex', {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    define: {
        timestamps: false
    }
  });

module.exports = sequelize;

