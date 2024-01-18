const mysql = require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection(
    {
     host: "localhost",
     user: "root",
     password: "password",
     database: "company",

    });

module.exports = connection;