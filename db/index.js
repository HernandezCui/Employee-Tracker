// Getting connection
const connection = require('./connection');


// DB commands
class DB {
    constructor(connection) {
        this.connection = connection;
    }
    getAllDepartments() {
        return this.connection.promise().query('SELECT * FROM department');
    }
    getAllRoles() {
        return this.connection.promise().query('SELECT * FROM role');
    }
    getAllEmployees() {
        return this.connection.promise().query('SELECT * FROM employee');
    }
    











}


