const inquirer = require("inquirer");
const db = require("./db");
require("console.table");

async function mainMenu() {
  const { menu } = await inquirer.prompt([
    {
      type: "list",
      name: "menu",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Delete a department",
        "Delete a role",
        "Delete an employee",
        "Exit",
      ],
    },
  ]);

  switch (menu) {
    case "View all departments":
      return viewDepartments();
    case "View all roles":
      return viewRoles();
    case "View all employees":
      return viewEmployees();
    case "Add a department":
      return addDepartment();
    case "Add a role":
      return addRole();
    case "Add an employee":
      return addEmployee();
    case "Update an employee role":
      return updateEmployeeRole();
    case "Delete a department":
      return deleteDepartment();
    case "Delete a role":
      return deleteRole();
    case "Delete an employee":
      return deleteEmployee();
    case "Exit":
      console.log("Bye!");
      process.exit();
  }
}

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
  try {
    // Fetch all roles from the database
    const roles = await db.findAllRoles();

    // Select a random role from the roles array
    const randomRole = roles[Math.floor(Math.random() * roles.length)];

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
        name: 'manager_id',
        message: "What is the employee's manager ID? (Leave blank if no manager)"
      }
    ]);

    const employeeData = {
      first_name: answers.first_name,
      last_name: answers.last_name,
      role_id: randomRole.id, // Use the random role_id
      manager_id: answers.manager_id ? parseInt(answers.manager_id) : null
    };

    await db.addAnEmployee(employeeData);
    console.log('Employee added successfully!');
    mainMenu();
  } catch (error) {
    console.error('Error adding employee:', error);
    mainMenu();
  }
}

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

mainMenu();