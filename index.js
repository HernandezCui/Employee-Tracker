const inquirer = require("inquirer");
const db = require("./db");
require("console.table");

const exit = () => {
  console.log("Bye!");
  process.exit(0);
};

const mainMenu = async () => {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "menu",
      message: "What would you like to do?",
      choices: [
        { name: "View all departments", value: viewDepartments },
        { name: "View all roles", value: viewRoles },
        { name: "View all employees", value: viewEmployees },
        { name: "Add a department", value: addDepartment },
        { name: "Add a role", value: addRole },
        { name: "Add an employee", value: addEmployee },
        { name: "Update an employee role", value: updateEmployeeRole },
        { name: "Update employee manager", value: updateEmployeeManager },
        { name: "View employees by manager", value: viewByManager },
        { name: "View employees by department", value: viewByDepartment },
        { name: "Delete a department", value: deleteDepartment },
        { name: "Delete a role", value: deleteRole },
        { name: "Delete an employee", value: deleteEmployee },
        { name: "View total utilized budget by department", value: budgetByDepartment},
        { name: "Exit", value: exit },
      ],
    },
  ]);

  answer.menu();
};

async function viewDepartments() {
  const departments = await db.findAllDepartments();
  console.table(departments);
  mainMenu();
}

async function viewRoles() {
  const roles = await db.findAllRoles();
  console.table(roles);
  mainMenu();
}

async function viewEmployees() {
  const employees = await db.findAllEmployees();
  console.table(employees);
  mainMenu();
}

async function viewDepartments() {
  try {
    const [rows] = await db.findAllDepartments();
    console.table(rows);
  } catch (err) {
    console.error("Failed to retrieve departments:", err);
  }
  mainMenu();
}

async function viewRoles() {
  try {
    const [rows] = await db.findAllRoles();
    console.table(rows);
  } catch (err) {
    console.error("Failed to retrieve roles:", err);
  }
  mainMenu();
}

async function viewEmployees() {
  try {
    const [rows] = await db.findAllEmployees();
    console.table(rows);
  } catch (err) {
    console.error("Failed to retrieve employees:", err);
  }
  mainMenu();
}

async function addDepartment() {
  const { departmentName } = await inquirer.prompt({
    type: "input",
    name: "departmentName",
    message: "What is the name of the new department?",
  });
  await db.addADepartment(departmentName);
  console.log(`Added new department: ${departmentName}`);
  mainMenu();
}

async function addRole() {
  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of the new role?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary for this role?",
    },
    {
      type: "input",
      name: "departmentId",
      message:
        "Which department does this role belong to? (Enter Department ID)",
    },
  ]);
  await db.addARole(title, salary, departmentId);
  console.log(`Added new role: ${title}`);
  mainMenu();
}

async function addEmployee() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?"
        },
        {
            type: 'input',
            name: 'role_id',
            message: "What is the employee's role ID?"
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "What is the employee's manager ID? (Leave blank if no manager)"
        }
        
    ]);

    const employeeData = {
        first_name: answers.first_name,
        last_name: answers.last_name,
        role_id: parseInt(answers.role_id),
        manager_id: answers.manager_id ? parseInt(answers.manager_id) : null
    };

    
    if (isNaN(employeeData.role_id) || isNaN(employeeData.manager_id) && employeeData.manager_id !== null) {
        console.log('Invalid role ID or manager ID. Please enter a valid number.');
        return addEmployee();
    }

    await db.addAnEmployee(employeeData);
    console.log('Employee added successfully!');
    mainMenu();
};

async function updateEmployeeRole() {
  const { employeeId, roleId } = await inquirer.prompt([
    {
      type: "input",
      name: "employeeId",
      message: "Which employee do you want to update? (Enter Employee ID)",
    },
    {
      type: "input",
      name: "roleId",
      message: "What is the new role for the employee? (Enter Role ID)",
    },
  ]);
  await db.updateAnEmployeeRole(employeeId, roleId);
  console.log(`Updated employee's role.`);
  mainMenu();
}

async function deleteDepartment() {
  const { departmentId } = await inquirer.prompt({
    type: "input",
    name: "departmentId",
    message: "Which department do you want to delete? (Enter Department ID)",
  });
  await db.deleteADepartment(departmentId);
  console.log(`Deleted department.`);
  mainMenu();
}

async function deleteRole() {
  const { roleId } = await inquirer.prompt({
    type: "input",
    name: "roleId",
    message: "Which role do you want to delete? (Enter Role ID)",
  });
  await db.deleteARole(roleId);
  console.log(`Deleted role.`);
  mainMenu();
}

async function deleteEmployee() {
  const { employeeId } = await inquirer.prompt({
    type: "input",
    name: "employeeId",
    message: "Which employee do you want to delete? (Enter Employee ID)",
  });
  await db.deleteAnEmployee(employeeId);
  console.log(`Deleted employee.`);
  mainMenu();
}

async function updateEmployeeManager() {
  const { employeeId, managerId } = await inquirer.prompt([
    {
      type: "input",
      name: "employeeId",
      message: "Which employee's manager do you want to update? (Enter Employee ID)",
    },
    {
      type: "input",
      name: "managerId",
      message: "What is the new manager's ID for the employee? (Enter Manager ID)",
    },
  ]);
  await db.updateAnEmployeeManager(employeeId, managerId);
  console.log(`Updated employee's manager.`);
  mainMenu();
}

async function viewByManager() {
  const { managerId } = await inquirer.prompt({
    type: "input",
    name: "managerId",
    message: "Enter Manager ID to view employees under that manager:",
  });
  const employees = await db.findEmployeesByManager(managerId);
  console.table(employees);
  mainMenu();
}

async function viewByDepartment() {
  const { departmentId } = await inquirer.prompt({
    type: "input",
    name: "departmentId",
    message: "Enter Department ID to view employees in that department:",
  });
  const employees = await db.findEmployeesByDepartment(departmentId);
  console.table(employees);
  mainMenu();
}

async function budgetByDepartment() {
  const { departmentId } = await inquirer.prompt({
    type: "input",
    name: "departmentId",
    message: "Enter Department ID to view the total utilized budget:",
  });
  const budget = await db.calculateBudgetByDepartment(departmentId);
  console.log(`Total Utilized Budget for Department ${departmentId}: $${budget}`);
  mainMenu();
}

mainMenu();