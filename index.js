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
            updateEmployee();
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








}