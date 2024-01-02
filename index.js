// Dependencies 
const inquirer = require('inquirer');
const db = require('./db');
const cTable = require('console.table');

// function that will display onced logged in 
function startApp() {
    inquirer.
    prompt({
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
        ],
    })
    .then((answer) => {
       switch (answer.option) {
        case 'View all departments':
            viewAllDepartments();
            break;

        case 'View all roles':
            viewAllRoles();
            break;

        case 'View all employees':
            viewAllEmployees();
            break;

        case 'Add a department':
            addDepartment();
            break;

        case 'Add a role':
            addRole();
            break;
        
        case 'Add a employee':
            addEmployee();
            break;

        case 'Update an employee role':
            updateEmployeeRole();
            break;
        
        default: 
            console.log('Goodbye!');

            // Close database if needed
            db.closeConnection();
       }
    });

// function to handle viewing all departments and roles
function viewAllDepartments() {
    db.getAllDepartments()
        .then((departments) => {
            console.table(departments);
            startApp();
        })
        .catch((err) => {
            console.error(err);
            startApp();
        });
}

function viewAllRoles() {
    db.getAllRoles()
        .then((roles) => {
            console.table(roles);
            startApp();
        })
        .catch((err) => {
            console.error(err);
            startApp();
        });
}

function viewAllEmployees() {
    db.getAllEmployees()
        .then((employees) => {
            console.table(employees);
            startApp();
        })
        .catch((err) => {
            console.error(err);
            startApp();
        });
}


// Call corresponding functions when adding departments and roles

function addDepartment() {
    inquirer
    .prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department'
    })
    .then((answer) => {
        db.addDepartment(answer.deparmentName)
        .then(() => {
            console.log('Department added successfully');
            startApp();
        })
        .catch((err) => {
            console.error(err);
            startApp();
        });
    });
}


function addRole() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Enter the name of the role'   
        },
        {
            type: 'input',
            name:'salaryTotal',
            message: 'Enter the salary of the role'
        },
        {
            type: 'input',
            name: 'deptId',
            message: 'Enter the department ID for the role'
        }
    ])
    .then((answer) => {
        db.addRole(answer.roleName)
        .then(() => {
            console.log('Role added successfully');
            startApp();
        })
        .catch((err) => {
            console.error(err);
            startApp();
        });
    });
}


function addEmployee() {
    db.getNewEmployee()
        .then((newEmployee) => {
            console.table(newEmployee);
            startApp();
        })
        .catch((err) => {
            console.error(err);
            startApp();
        });
}

function updateEmployeeRole() {
    db.getUpdatedEmployeeRole()
        .then((employeeRole) => {
            console.table(employeeRole);
            startApp();
        })
        .catch((err) => {
            console.error(err);
            startApp();
        });
}




}