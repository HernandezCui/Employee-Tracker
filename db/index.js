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
    addDepartment(departmentName) {
        return this.connection
        .promise()
        .query('INSERT INTO department (name) VALUES (?)', [departmentName]);
    }
    addRole(roleName, salary, departmentId) {
        return this.connection
        .promise()
        .query('INSERT INTO role (title, salary, departmentId) VALUES (?, ?, ?)', [roleName, salary, departmentId]);
    }
    addEmployee(firstName, lastName, roleId, managerId) {
        return this.connection
        .promise()
        .query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]); 
    }
    updateEmployeeRole(employeeId, newRoleId) {
        return this.connection
        .promise()
        .query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
    }
    updateEmployeeManager(employeeId, newManagerId) {
        return this.connection
        .promise()
        .query('UPDATE employee SET manager_id = ? WHERE id = ?', [newManagerId, employeeId]);
    }
    getEmployeeById(employeeId) {
        return this.connection
        .promise()
        .query('SELECT * FROM employee WHERE id = ?', [employeeId]);
    }
    getManagerEmployees(managerId) {
        return this.connection
        .promise()
        .query('SELECT * FROM employee WHERE manager_id = ?', [managerId]);
    }
    getRolesByDepartment(departmentId) {
        return this.connection
        .promise()
        .query('SELECT * FROM role WHERE department_id = ?', [departmentId]);
    }
    
   













}


