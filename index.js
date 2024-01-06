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
    };

    const action = actionMap[option];
    if(action) {
        action();
    } else {
        console.log('Invalid option selected');
        startApp();
    }
}


    // .then((answer) => {
    //    switch (answer.option) {
    //     case 'View all departments':
    //         viewAllDepartments();
    //         break;

    //     case 'View all roles':
    //         viewAllRoles();
    //         break;

    //     case 'View all employees':
    //         viewAllEmployees();
    //         break;

    //     case 'Add a department':
    //         addDepartment();
    //         break;

    //     case 'Add a role':
    //         addRole();
    //         break;
        
    //     case 'Add a employee':
    //         addEmployee();
    //         break;

    //     case 'Update an employee role':
    //         updateEmployeeRole();
    //         break;

    //     case 'View employees by manager':
    //         viewEmployeesByManager();
    //         break;

    //     case 'Update employee by manager':
    //         updateEmployeeManager();
    //         break;

    //     case 'View employees by department':
    //         viewEmployeesByDepartment();
    //         break;

    //     case 'Delete department, role, or employee':
    //         deleteRecord();
    //         break;

    //     case 'View total utilized budget for department':
    //         viewDepartmentBudget();
    //         break;
        
    //     case 'Quit':
    //         inquirer
    //         .prompt({
    //             type: 'confirm',
    //             name: 'confirmQuit',
    //             message: 'Are you sure you want to quit?',
    //             default: false,
    //         })
    //         .then((confirmAnswer) => {
    //             if (confirmAnswer.confirmQuit) {
    //                 console.log('Goodbye');
    //                 // Close database if needed 
    //                 db.closeConnection();
    //                 process.exit();
    //             } else {
    //                 startApp();
    //             }
    //         });
    //         break;

    //     default: 
    //         console.log('Invalid option selected');
    //         startApp();
    //    }
    // });

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
        db.addDepartment(answer.departmentName)
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
        db.addRole(answer.roleName, answer.salaryTotal, answer.deptId)
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
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'employeeFirstName',
            message: 'Enter the employees First Name'
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: 'Enter the employees Last Name'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the employees role id number'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter the managers id number'
        }
    ])
    .then((answer) => {
        db.addEmployee(answer.employeeFirstName, answer.employeeLastName, answer.roleId, answer.managerId)
        .then(() => {
            console.log('Employee added successfully');
            startApp();
        })
        .catch((err) => {
            console.error(err);
            startApp();
        });
    });
}

function updateEmployeeRole() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the ID of the employee you want to update',
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the new role ID for the employee'
        }
    ])
    .then((answer) => {
    db.updateEmployeeRole(answer.employeeId, answer.roleId)
        .then(() => {
            console.log('Employee role updated successfully');
            startApp();
        })
        .catch((err) => {
            console.error(err);
            startApp();
        });
    });
}

// Bonus additions

// function to view employees by manager 
function viewEmployeesByManager() {
    inquirer
    .prompt({
        type: 'input',
        name: 'managerId',
        message: 'Enter the ID of the manager to view their employees',
    })
    .then((answer) => {
        db.getEmployeesByManager(answer.managerId)
            .then((employees) => {
                console.table((employees)); 
                startApp();
            })
            .catch((err) => {
                console.error(err);
                startApp();
            });
    });
}

// function to handle updating employee managers

function updateEmployeeManager() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'employeeID',
            message: 'Enter the ID of the employee you want to update'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter the new manager ID for the employee',
        }
    ])
    .then((answer) => {
        db.updateEmployeeManager(answer.employeeId, answer.managerId)
            .then(() => {
                console.log('Employee manager updated successfully');
                startApp();
            })
            .catch((err) => {
                console.error(err);
                startApp();
            });
    });
}

// function to view employees by department
function viewEmployeesByDepartment() {
    inquirer
    .prompt({
        type:'input',
        name: 'deptId',
        message: 'Enter the ID of the department to view its employees'
    })
    .then((answer) => {
        db.getEmployeesByDepartment(answer.deptId)
        .then((employees) => {
            console.table(employees);
            startApp();
        });
    });
}

// function to delete departments, roles, and employees
function deleteRecord() {
    inquirer
    .prompt({
        type: 'list',
        name: 'recordType',
        message: 'Select the type of record to delete',
        choices: ['Department', 'Role', 'Employee']
    })
    .then((answer) => {
        switch (answer.recordType) {
            case 'Department':
                deleteDepartment();
                break;
            
            case 'Role':
                deleteRole();
                break;

            case 'Employee':
                deleteEmployee();
                break;
            
            default:
                startApp();
        }
    });
}

function deleteDepartment() {
    inquirer
    .prompt({
        type: 'input',
        name: 'deptId',
        message: 'Enter the ID of the department to delete',
    })
    .then((answer) => {
        db.deleteDepartment(answer.deptId)
            .then(() => {
                console.log('Department deleted successfully');
                startApp();
            })
            .catch((err) => {
                console.error(err);
                startApp();
            });
    });
}

function deleteRole() {
    inquirer
    .prompt({
        type: 'input',
        name: 'roleId',
        message: 'Enter the ID of the role to delete',
    })
    .then((answer) => {
        db.deleteRole(answer.roleId)
            .then(() => {
                console.log('Role deleted successfully');
                startApp();
            })
            .catch((err) => {
                console.error(err);
                startApp();
            });
    });
}

function deleteEmployee() {
    inquirer
    .prompt({
        type: 'input',
        name: 'employeeId',
        message: 'Enter the ID of the employee to delete',
    })
    .then((answer) => {
        db.deleteEmployee(answer.employeeId)
            .then(() => {
                console.log('Employee deleted successfully');
                startApp();
            })
            .catch((err) => {
                console.error(err);
                startApp();
            });
    });
}

// function to view total utilized budget of a department 
function viewDepartmentBudget() {
    inquirer
    .prompt({
        type: 'input',
        name: 'deptId',
        message: 'Enter the ID of the department to view its budget'
    })
    .then((answer) => {
        db.getDepartmentBudget(answer.deptId)
            .then((budget) => {
                console.log(`Total utilized budget for the Department: ${budget}`);
                startApp();
            })
            .catch((err) => {
                console.error(err);
                startApp();
            });
        });
    }

}