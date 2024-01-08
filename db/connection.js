const mysql = require('mysql2');

// Connect to election database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'password', // Your MySQL password
    database: 'company', 
});

module.exports = connection;