// Getting connection
const connection = require('./connection');


// DB commands
class db {
    constructor(connection) {
        this.connection = connection;
    }
    getAllDepartments() {
        return this.connection.promise().query('SELECT * FROM department');
    }
    getAllRoles() {
        return this.connection.promise().query(
            'SELECT roles.id, roles.title, roles.salary, department.name AS department FROM roles LEFT JOIN department ON roles.department_id = department.id'
            );
    }
    getAllEmployees() {
        return this.connection.promise().query(
            `SELECT employee.id, CONCAT(employee.first_name, ' ' , employee.last_name) AS name, roles.title, department.name AS department, roles.salary, 
            CONCAT(manager.first_name, ' ' , manager.last_name) AS manager FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id 
            LEFT JOIN employee manager ON manager.id = employee.manager_id`
            );
    }
    addDepartment(departmentName) {
        return this.connection
        .promise()
        .query('INSERT INTO department (name) VALUES (?)', [departmentName]);
    }
    addRole(roleTitle, salaryTotal, departmentId) {
        return this.connection
        .promise()
        .query('INSERT INTO role (title, salary, departmentId) VALUES (?, ?, ?)', [roleTitle, salaryTotal, departmentId]);
    }
    addEmployee(answer) {
        return this.connection
        .promise()
        .query('INSERT INTO employee SET ?', answer); 
    }
    updateEmployeeRole(roleId, employeeId) {
        return this.connection
        .promise()
        .query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
    }
    updateEmployeesByManager(managerId, employeeId) {
        return this.connection
        .promise()
        .query('UPDATE employee SET employee.manager_id = ? WHERE id = ?', [managerId, employeeId]);
    }
    viewEmployeesByManager(managerId) {
        return this.connection
        .promise()
        .query(`SELECT employee.id, employee.manager_id, CONCAT(employee.first_name, ' ' , employee.last_name) 
        AS name FROM employee LEFT JOIN roles on employee.role_id = roles.id WHERE manager_id = ?`, [managerId]);;
    }
    viewEmployeesByDepartment(departmentId) {
        console.log("depId: ", departmentId);
        return this.connection
        .promise()
        .query(`SELECT CONCAT(employee.first_name, ' ' , employee.last_name) AS name, department.name AS department
        FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department on roles.department_id = department.id
        WHERE department.id = ?`, [departmentId]);
    }
    deleteDepartment(departmentId) {
        return this.connection
        .promise()
        .query('DELETE FROM department WHERE id = ?', [departmentId]);
    }
    deleteRole(roleId) {
        return this.connection
        .promise()
        .query('DELETE FROM roles WHERE id = ?', [roleId]);
    }
    deleteEmployee(employeeId) {
        return this.connection
        .promise()
        .query('DELETE FROM employee WHERE id = ?', [employeeId]);
    }
    budgetByDepartment() {
        return this.connection
        .promise()
        .query('SELECT department.name AS department, department.id, SUM(salary) AS total_salary FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department on roles.department_id = department.id GROUP BY department.id');
    } 
    closeConnection() {
        this.connection.end();
    }
}

module.exports = new db(connection);


