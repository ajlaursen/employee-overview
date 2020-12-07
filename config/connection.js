const Sequelize = require ('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    "employeeDB",
    "root",
    "rootpass",
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 8080,
    }
);

module.exports = sequelize;