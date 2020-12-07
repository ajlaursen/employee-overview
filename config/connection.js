const mysql = require ("mysql");
const util = require ('util');
require('dotenv').config();

const connection = mysql.createConnection({
host: 'localhost',
dialect: 'mysql',
port: 3306,
user : process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME
});

connection.connect();
connection.query = util.promisify(connection.query)

module.exports = connection;