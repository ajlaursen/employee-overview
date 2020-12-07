const express = require("express");
const inquirer = require("inquirer");
const ctable = require("console.table");
const connection = require("./config/connection");
const db = require("./public/dbCalls");

const app = express();
const PORT = process.env.PORT || 3301;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

init();

function init() {
  inquirer
    .prompt({
      name: "initChoice",
      type: "list",
      message: "Choose an action",
      choices: [
        {
          name: "Veiw all employees",
          value: "veiw_employees",
        },
        {
          name: "Veiw departments",
          value: "veiw_departments",
        },
        {
          name: "Veiw roles",
          value: "veiw_roles",
        },
        {
          name: "Add department",
          value: "add_departments",
        },
        {
          name: "Add a new role to a department",
          value: "add_role",
        },
        {
          name: "Add a new employee",
          value: "add_employee",
        },
        {
          name: "Update employee role",
          value: "update_employee",
        },
        {
          name: "Exit",
          value: "exit",
        },
      ],
    })
    .then(async function (answers) {
      // initial branch of funcitons
      switch (answers.initChoice) {
        case "veiw_employees":
          const emp = await db.viewEmployees();
          console.table(emp);
          init();
          break;
        case "veiw_departments":
          const dept = await db.veiwDepartments();
          console.table(dept);
          init();
          break;
        case "veiw_roles":
          const roles = await db.viewRoles();
          console.table(roles);
          init();
          break;
        case "add_departments":
          inquirer
            .prompt({
              name: "newDepartment",
              type: "input",
              message: "Enter department name.",
            })
            .then(async (answers) => {
              const newDepts = await db.addDepartment(answers.newDepartment);
              console.table(newDepts);
              init();
            });
          break;
        case "add_role":
          const deptList = await db.deptPrompt();
          inquirer
            .prompt([
              {
                name: "newRoleDept",
                type: "list",
                message:
                  "Choose the department you would like to add a role to",
                choices: deptList,
              },
              {
                name: "newRole",
                tpye: "input",
                message: "What is the title of the new role?",
              },
              {
                name: "newRoleSalary",
                tpye: "integer",
                message: "What is the salary of the new role?",
              },
            ])
            .then(async function (answers) {
              const newAddedRole = await db.addRole(
                answers.newRole,
                answers.newRoleSalary,
                answers.newRoleDept
              );
              console.table(newAddedRole);
              init();
            });
          break;
        case "add_employee":
          const managerList = await db.managerPrompt();
          const roleList = await db.rolePrompt();
          inquirer
            .prompt([
              {
                name: "firstName",
                type: "input",
                message: "What is the new employee's first name?",
              },
              {
                name: "lastName",
                type: "input",
                message: "What is the new employee's last name?",
              },
              {
                name: "role",
                type: "list",
                message: "What is the new employee's role?",
                choices: roleList,
              },
              {
                name: "manager",
                type: "list",
                message: "Who is the employee's Manager",
                choices: managerList,
              },
            ])
            .then(async function (answers) {
              const newAddedEmployee = await db.addEmployee(
                answers.firstName,
                answers.lastName,
                answers.role,
                answers.dept
              );
              console.table(newAddedEmployee);
              init();
            });
          break;
        case "update_employee":
          const shortEmployeeList = await db.promptEmployees();
          const roleList2 = await db.rolePrompt();
          inquirer
            .prompt([
              {
                name: "employeePicked",
                type: "list",
                message: "What employee employee do you want to update?",
                choices: shortEmployeeList,
              },
              {
                name: "role",
                type: "list",
                message: "What is the employee's new role?",
                choices: roleList2,
              },
            ])
            .then(async function (answers) {
              const updatedEmployee = await db.updateEmployee(
                answers.role,
                answers.employeePicked
              );
              console.table(updatedEmployee);
              init();
            });
          break;
        case "exit":
          connection.end();
          break;
      }
    });
}
