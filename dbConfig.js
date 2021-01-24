const Sequelize = require('sequelize');

const sequelize = new Sequelize('meinWorterbuch', 'postgres', 'agr3at.Pa55w0rd', {
    host: 'meinworterbuch.clvjecef6z3f.us-east-2.rds.amazonaws.com',
    port: '5432',
    dialect: 'postgres',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    define: {
        timestamps: false
    }
  });

module.exports = sequelize;

