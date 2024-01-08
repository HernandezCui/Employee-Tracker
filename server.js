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
            { name: 'Update employee by manager', value: updateEmployeeByManager },
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



// function addRole() {
//     const prompts = [
//         { type: 'input', name: 'roleName', message: 'Enter the name of the role' },
//         { type: 'input', name: 'salaryTotal', message: 'Enter the salary of the role' },
//         { type: 'input', name: 'departmentId', message: 'Enter the department ID for the role'},
//     ];

//     inquirer.prompt(prompts)
//     .then((answer) => 
//         db
//             .addRole(answer.roleName, answer.salaryTotal, answer.departmentId)
//             .then(handleSuccess)
//             .catch(handleError)
//     )
//     .finally(startApp);
// }

// function addEmployee() {
//     const prompts = [
//         { type: 'input', name: 'employeeFirstName', message: 'Enter the first name of the employee' },
//         { type: 'input', name: 'employeeLastName', message: 'Enter the last name of the employee' },
//         { type: 'input', name: 'roleId', message: 'Enter the employees role id number' },
//         { type: 'input', name: 'managerId', message: 'Enter the managers id number' }, 
//     ];

//     inquirer.prompt(prompts)
//     .then((answer) => 
//         db
//             .addEmployee(answer.employeeFirstName, answer.employeeLastName, answer.roleId, answer.managerId)
//             .then(handleSuccess)
//             .catch(handleError)
//     )
//     .finally(startApp);
// }

// function updateEmployeeRole() {
//     const prompts = [
//         { type: 'input', name: 'employeeId', message: 'Enter the ID of the employee you want to update' },
//         { type: 'input', name: 'roleId', message: 'Enter the new role ID for the employee' },
//     ];

//     inquirer.prompt(prompts)
//     .then((answer) => 
//         db
//             .updateEmployeeRole(answer.employeeId, answer.roleId)
//             .then(handleSuccess)
//             .catch(handleError)
//     )
//     .finally(startApp);
// }


// // Bonus additions

// // function to view employees by manager 
// function viewEmployeesByManager() {
//     const prompts = [
//         { type: 'input', name: 'managerId', message: 'Enter the ID of the manager to view employees' },

//     ];

//     inquirer.prompt(prompts)
//     .then((answer) => 
//         db
//             .viewEmployeesByManager(answer.managerId)
//             .then(displayTable)
//             .catch(handleError)
//     )
//     .finally(startApp);
// }

// // function to update employees by manager

// function updateEmployeesByManager() {
//     const prompts = [
//         { type: 'input', name: 'employeeId', message: 'Enter the ID of the employee you want to update' },
//         { type: 'input', name: 'managerId', message: 'Enter the new maanger ID for the employee' },
//     ];

//     inquirer.prompt(prompts)
//     .then((answer) => 
//         db
//             .updateEmployeesByManager(answer.employeeId, answer.managerId)
//             .then(handleSuccess)
//             .catch(handleError)
//     )
//     .finally(startApp);
// }

// // function to view employees by department

// function viewEmployeesByDepartment() {
//     const prompts = [
//         { type: 'input', name: 'departmentId', message: 'Enter the ID of the department to view employees' },
//     ];

//     inquirer.prompt(prompts)
//     .then((answer) => 
//         db
//             .viewEmployeesByDepartment(answer.departmentId)
//             .then(displayTable)
//             .catch(handleError)
//     )
//     .finally(startApp);
// }

// // function to delete departments, roles, and employees

// function deleteDepartment() {
//     const prompts = [
//         { type: 'input', name: 'departmentId', message: 'Enter the ID of the department to delete' },
//     ];

//     inquirer.prompt(prompts)
//     .then((answer) => 
//         db
//             .deleteDepartment(answer.departmentId)
//             .then(handleSuccess)
//             .catch(handleError)
//     )
//     .finally(startApp);
// }

// function deleteRole() {
//     const prompts = [
//         { type: 'input', name: 'roleId', message: 'Enter the ID of the role to delete' },
//     ];

//     inquirer.prompt(prompts)
//     .then((answer) => 
//         db
//             .deleteRole(answer.roleId)
//             .then(handleSuccess)
//             .catch(handleError)
//     )
//     .finally(startApp);
// }

// function deleteEmployee() {
//     const prompts = [
//         { type: 'input', name: 'employeeId', message: 'Enter the ID of the employee to delete' },
//     ];

//     inquirer.prompt(prompts)
//     .then((answer) => 
//         db
//             .deleteEmployee(answer.employeeId)
//             .then(handleSuccess)
//             .catch(handleError)
//     )
//     .finally(startApp);
// }
 

// // function to view total utilized budget of a department 
// function viewDepartmentBudget() {
//     const prompts = [
//         { type: 'input', name: 'departmentId', message: 'Enter the ID of the department to view the budget' },
//     ];

//     inquirer.prompt(prompts)
//     .then((answer) => 
//         db
//             .viewDepartmentBudget(answer.departmentId)
//             .then(displayTable)
//             .catch(handleError)
//     )
//     .finally(startApp);
// }

// function displayTable(data) {
//     console.table(data);
// }

// function handleError(err) {
//     console.error(err);
// }

// function handleSuccess() {
//     console.log('Operation Successful');
// }

// startApp();