// Dependencies 
const inquirer = require('inquirer');
const db = require('./db');
const cTable = require('console.table');

// function that will display onced logged in 
function startApp() {
    inquirer
    .prompt({
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add a employee',
            'Update an employee role',
            'Quit', // Added Quit option 
        ],
    })
    .then(handleOption);
}

function handleOption(answer) {
    switch (answer.option) {
        case 'Quit':
            confirmQuit();
            break;
        default:
            executeAction(answer.option);
    }
}

function executeAction(option) {
    const actionMap = {
        'View all departments': viewAllDepartments,
        'View all roles': viewAllRoles,
        'View all employees': viewAllEmployees,
        'Add a department': addDepartment,
        'Add a role': addRole,
        'Add a employee': addEmployee,
        'Update an employee role': updateEmployeeRole,
        'View employees by manager': viewEmployeesByManager,
        'Update an employee by manager': updateEmployeesByManager,
        'View employees by department': viewEmployeesByDepartment,
        'Delete department': deleteDepartment,
        'Delete role': deleteRole,
        'Delete employee': deleteEmployee,
    };

    const action = actionMap[option];
    if(action) {
        action();
    } else {
        console.log('Invalid option selected');
        startApp();
    }
}

function confirmQuit() {
    inquirer
    .prompt({
        type: 'confirm',
        name: 'confirmQuit',
        message: 'Are you sure you want to quit?',
        default: 'false',
    })
    .then((confirmAnswer) => {
        confirmAnswer.confirmQuit ? handleQuit() : startApp();
    })
}

function handleQuit() {
    console.log('Goodbye');
    db.closeConnection();
}

// function to handle viewing all departments and roles
function viewAllDepartments() {
    db.getAllDepartments().then(displayTable).catch(handleError).finally(startApp);
}

function viewAllRoles() {
    db.getAllRoles().then(displayTable).catch(handleError).finally(startApp);
}

function viewAllEmployees() {
    db.getAllEmployees().then(displayTable).catch(handleError).finally(startApp);
}


// Call corresponding functions when adding departments and roles
function addDepartment() {
    inquirer 
    .prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department',
    })
    .then((answer) => db.addDepartment(answer.departmentName).then(handleSuccess).catch(handleError))
    .finally(startApp);
}

function addRole() {
    const prompts = [
        { type: 'input', name: 'roleName', message: 'Enter the name of the role' },
        { type: 'input', name: 'salaryTotal', message: 'Enter the salary of the role' },
        { type: 'input', name: 'deptId', message: 'Enter the department ID for the role'},
    ];

    inquirer.prompt(prompts)
    .then((answer) => db.addRole(answer.roleName, answer.salaryTotal, answer.deptId)
    .then(handleSuccess).catch(handleError))
    .finally(startApp);
}

function addEmployee() {
    const prompts = [
        { type: 'input', name: 'employeeFirstName', message: 'Enter the first name of the employee' },
        { type: 'input', name: 'employeeLastName', message: 'Enter the last name of the employee' },
        { type: 'input', name: 'roleId', message: 'Enter the employees role id number' },
        { type: 'input', name: 'managerId', message: 'Enter the managers id number' }, 
    ];

    inquirer.prompt(prompts)
    .then((answer) => db.addEmployee(answer.employeeFirstName, answer.employeeLastName, answer.roleId, answer.managerId)
    .then(handleSuccess).catch(handleError))
    .finally(startApp);
}

function updateEmployeeRole() {
    const prompts = [
        { type: 'input', name: 'employeeId', message: 'Enter the ID of the employee you want to update' },
        { type: 'input', name: 'roleId', message: 'Enter the new role ID for the employee' },
    ];

    inquirer.prompt(prompts)
    .then((answer) => db.updateEmployeeRole(answer.employeeId, answer.RoleId)
    .then(handleSuccess).catch(handleError))
    .finally(startApp);
}


// Bonus additions

// function to view employees by manager 
function viewEmployeesByManager() {
    const prompts = [
        { type: 'input', name: 'managerId', message: 'Enter the ID of the manager to view employees' },

    ];

    inquirer.prompt(prompts)
    .then((answer) => db.viewEmployeesByManager(answer.managerId)
    .then(displayTable).catch(handleError))
    .finally(startApp);
}

// function to update employees by manager

function updateEmployeesByManager() {
    const prompts = [
        { type: 'input', name: 'employeeId', message: 'Enter the ID of the employee you want to update' },
        { type: 'input', name: 'managerId', message: 'Enter the new maanger ID for the employee' },
    ];

    inquirer.prompt(prompts)
    .then((answer) => db.updateEmployeesByManager(answer.employeeId, answer.managerId)
    .then(handleSuccess).catch(handleError))
    .finally(startApp);
}

// function to view employees by department

function viewEmployeesByDepartment() {
    const prompts = [
        { type: 'input', name: 'departmentId', message: 'Enter the ID of the department to view employees' },
    ];

    inquirer.prompt(prompts)
    .then((answer) => db.viewEmployeesByDepartment(answer.departmentId)
    .then(displayTable).catch(handleError))
    .finally(startApp);
}

// function to delete departments, roles, and employees

function deleteDepartment() {
    const prompts = [
        { type: 'input', name: 'departmentId', message: 'Enter the ID of the department to delete' },
    ];

    inquirer.prompt(prompts)
    .then((answer) => db.deleteDepartment(answer.departmentId)
    .then(handleSuccess).catch(handleError))
    .finally(startApp);
}

function deleteRole() {
    const prompts = [
        { type: 'input', name: 'roleId', message: 'Enter the ID of the role to delete' },
    ];

    inquirer.prompt(prompts)
    .then((answer) => db.deleteRole(answer.roleId)
    .then(handleSucces).catch(handleError))
    .finally(startApp);
}

function deleteEmployee() {
    const prompts = [
        { type: 'input', name: 'employeeId', message: 'Enter the ID of the employee to delete' },
    ];

    inquirer.prompt(prompts)
    .then((answer) => db.deleteEmployee(answer.employeeId)
    .then(handleSucces).catch(handleError))
    .finally(startApp);
}
 

// function to view total utilized budget of a department 
