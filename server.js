// Dependencies 
const inquirer = require('inquirer');
const db = require('./db');
require('console.table');

const exit = () => {
    console.log('Goodbye!');
    db.closeConnection();
    process.exit(0);
}; 

// function that will display onced logged in 
const mainScreen = () => {
    const answer = await.inquirer.prompt([
    {
        type: 'list',
        name: 'main',
        message: 'What would you like to do?',
        choices: [
            { name: 'View all departments', value: viewAllDepartments },
            { name: 'View all roles', value: viewAllRoles },
            { name: 'View all employees', value: viewAllEmployees },
            { name: 'Add a department', value: addDepartment },
            { name: 'Add a role', value: addRole },
            { name: 'Add a employee', value: addEmployee },
            { name: 'Update an employee role', value: updateEmployeeRole },
            { name: 'View employees by manager', value: viewEmployeesByManager },
            { name: 'Update employee by manager', value: updateEmployeesByManager },
            { name: 'View employees by department', value: viewEmployeesByDepartment },
            { name: 'Delete department', value: deleteDepartment },
            { name: 'Delete Role', value: deleteRole },
            { name: 'Delete Employee', value: deleteEmployee },
            { name: 'View total budget of a department' , value: budgetByDepartment },
            { name: 'Quit', value: exit },
        ],
    },
]);

answer.main();
};

// Functions for the main options 
const viewAllDepartments = async () => {
    try {
        const [rows] = await db.getAllDepartments();
        console.table(rows);
    } catch(err) {
        console.error(err);
    } finally {
        mainScreen();
    }
};

const viewAllRoles = async () => {
    try {
        const [rows] = await db.getAllRoles();
        console.table(rows);
    } catch(err) {
        console.error(err);
    } finally {
        mainScreen();
    }
};

const viewAllEmployees = async () => {
    try {
        const [rows] = await db.getAllEmployees();
        console.table(rows);
    } catch(err) {
        console.error(err);
    } finally {
        mainScreen();
    }
};

const validateInput = (value) => {
    if (value) {
        return true;
    } else {
        console.log('\n Please enter a value');
        return false;
    }
};

const addDepartment = async () => {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the department name',
            validate: validateInput
        },
    ]);

    const departmentName = answer.name;

    try {
        await db.addDepartment(departmentName);
        const [rows] = await db.getAllDepartments();
        console.table(rows);
    } catch (err) {
        console.error(err);
    } finally {
        mainScreen();
    }
};

const addRole = async () => {
    const departments = await db.getAllDepartments();
    const departmentChoices = departments.map((department) => ({
        name: department.name,
        value: department.id,
    }));

    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the name of the role',
            validate: validateInput, 
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the role',
            validate: (value) => {
                if (isNaN(value) || parseFloat(value) <= 0) {
                    return 'Please enter a valid positive bumber for the Salary.';
                }
                return true;
            },
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Which department does the role belong to?',
            choices: departmentChoices,
        },
    ]);
    
    try {
        await db.addRole(answer.title, answer.salary, answer.departmentId);
        const [rows] = await db.getAllRoles();
        console.table(rows);
    } catch (err) {
        console.error(err);
    } finally {
        mainScreen();
    }
};

const addEmployee = async () => {
    const roles = await db.getAllRoles();
    const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id,
    }));

    const employees = await db.getAllEmployees();
    const managerChoices = employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
    }));

    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the employees first name',
            validate: validateInput,
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the employees last name last name',
            validate: validateInput,
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the employees role?',
            choices: roleChoices,
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who is the employees manager?',
            choices: [{ name: 'None', value: null }, ...managerChoices],
        },
    ]);

    try {
        await db.addEmployee(answer.first_name, answer.last_name, answer.role_id, answer.manager_id);
        const [rows] = await db.getAllEmployees();
        console.table(rows);
    } catch (err) {
        console.error(err);
    } finally {
        mainScreen();
    }
};

const updateEmployeeRole = async () => {
    const employees = await db.getAllEmployees();
    const employeeChoices = employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
    }));

    const roles = await db.getAllRoles();
    const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id,
    }));

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select the employee whose role you want to update:',
            choices: employeeChoices,
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the new role for the employee:',
            choices: roleChoices,
        },
    ]);

    try {
        await db.updateEmployeeRole(answer.employee_id, answer.role_id);
        console.log('Employee role updated Successfully.');
    } catch (err) {
        console.error(err);
    } finally {
        mainScreen();
    }
};


const viewEmployeesByManager = async () => {
    const employees = await db.getAllEmployees();
    const managerChoices = employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
    }));

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'manager_id',
            message: 'Select the manager to view employees:',
            choices: managerChoices,
        },
    ]);

    try {
        const [rows] = await db.viewEmployeesByManager(answer.manager_id);
        console.table(rows);
    } catch(err) {
        console.error(err);
    } finally {
        mainScreen();
    }
};


const updateEmployeesByManager = async () => {
    const employees = await db.getAllEmployees();
    const employeeChoices = employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
    }));

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select the employee whose manager you want to update:',
            choices: employeeChoices,
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Select the new manager for the employee:',
            choices: [...employeeChoices, { name: 'None', value: null }],
        },
    ]);

    try {
        await db.updateEmployeesByManager(answer.employee_id, answer.manager_id);
        console.log('Employee manager updated successfully.');
    } catch (err) {
        console.error(err);
    } finally {
        mainScreen();
    }
};

const viewEmployeesByDepartment = async () => {
    const departments = await db.getAllDepartments();
    const departmentChoices = departments.map((department) => ({
        name: department.name,
        value: department.id,
    }));

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            message: 'Select the department to view employees:',
            choices: departmentChoices,
        },
    ]);

    try {
        const [rows] = await db.viewEmployeesByDepartment(answer.department_id);
        console.table(rows);
    } catch (err) {
        console.error(err); 
    } finally {
        mainScreen();
    }
};


const deleteDepartment = async () => {
    const departments = await db.getAllDepartments();
    const departmentChoices = departments.map((department) => ({
        name: department.name,
        value: department.id,
    }));

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            message: 'Select the department to delete:',
            choices: departmentChoices,
        },
    ]);

    try {
        await db.deleteDepartment(answer.department_id);
        console.log('Department deleted successfully.');
    } catch (err) {
        console.error(err);
    } finally {
        mainScreen();
    }
};

const deleteRole = async () => {
    const roles = await db.getAllRoles();
    const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id,
    }));

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the role to delete:',
            choices: roleChoices,
        },
    ]);

    try {
        await db.deleteRole(answer.role_id);
        console.log('Role deleted Successfully.');
    } catch (err) {
        console.error(err);
    } finally {
        mainScreen();
    }
};

const deleteEmployee = async () => {
    const employees = await db.getAllEmployees();
    const employeeChoices = employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
    }));

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select the employee to delete:',
            choices: employeeChoices,
        },
    ]);

    try {
        await db.deleteEmployee(answer.employee_id);
        console.log('Employee deleted Successfully.');
    } catch (err) {
        console.error(err);
    } finally {
        mainScreen();
    }
};

const budgetByDepartment = async () => {
    const departments = await db.getAllDepartments();
    const departmentChoices = departments.map((department) => ({
        name: department.name,
        value: department.id,
    }));

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            message: 'Select the department to view budget:',
            choices: departmentChoices,
        },
    ]);

    try {
        const [rows] = await db.budgetByDepartment(answer.department_id);
        console.table(rows);
    } catch (err) {
        console.error(err);
    } finally {
        mainScreen();
    }
};

mainScreen();