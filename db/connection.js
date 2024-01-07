const mysql = require('mysql2');

// Connect to election database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: 'password', // Your MySQL password
    database: 'company', 
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id' + connection.threadId);
});

module.exports = connection;