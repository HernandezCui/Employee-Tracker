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
    addRole(roleName, salaryTotal, departmentId) {
        return this.connection
        .promise()
        .query('INSERT INTO role (title, salary, departmentId) VALUES (?, ?, ?)', [roleName, salaryTotal, departmentId]);
    }
    addEmployee(employeeFirstName, employeeLastName, roleId, managerId) {
        return this.connection
        .promise()
        .query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [employeeFirstName, employeeLastName, roleId, managerId]); 
    }
    updateEmployeeRole(employeeId, roleId) {
        return this.connection
        .promise()
        .query('UPDATE employee SET role_id = ? WHERE id = ?', [employeeId, roleId]);
    }
    updateEmployeesByManager(employeeId, managerId) {
        return this.connection
        .promise()
        .query('UPDATE employee SET manager_id = ? WHERE id = ?', [managerId, employeeId]);
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
    getEmployeesByRole(roleId) {
        return this.connection
        .promise()
        .query('SELECT * FROM employee WHERE role_id = ?', [roleId]);
    }
    deleteDepartment(departmentId) {
        return this.connection
        .promise()
        .query('DELETE FROM department WHERE id = ?', [departmentId]);
    }
    deleteRole(roleId) {
        return this.connection
        .promise()
        .query('DELETE FROM role WHERE id = ?', [roleId]);
    }
    deleteEmployee(employeeId) {
        return this.connection
        .promise()
        .query('DELETE FROM employee WHERE id = ?', [employeeId]);
    }
    getDepartmentBudget(departmentId) {
        return this.connection
        .promise()
        .query('SELECT SUM(salary) as budget FROM role WHERE departmentId = ?', [departmentId]);
    } 
}

module.exports = new DB(connection);


