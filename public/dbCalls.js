const connection = require('../config/connection');
const inquirer = require('inquirer');

class DB {
    constructor(connection){
        this.connection = connection 
    }

    viewEmployees(){
        return this.connection.query('SELECT e.id, e.first_name, e.last_name, d.name AS "Department Name", r.title AS "Role Title" FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id')
    }

    veiwDepartments(){
        return this.connection.query ('SELECT name as "Department Name" FROM department')
    }

    viewRoles(){
        return this.connection.query ('SELECT title as "Role Title" FROM role')
    }

    addDepartment(name){
        console.log("poo");
        this.connection.query ("INSERT INTO department SET ?", {"name": name})
        return this.connection.query ('SELECT name as "Department Name" FROM department')
    }
    addDepartmentPrompt(){
        inquirer.prompt({
            name: "newDepartment",
            type: "input",
            message: "Enter department name."
        }).then(async (answers) => {
            const newDepts = await db.addDepartment(answers.newDepartment);
            console.table(newDepts)
            
        })
    }
    deptPrompt(){
        return this.connection.query('SELECT name AS "name", id AS "value" FROM department')
    }
    addRole(title, salary, department_id){
        this.connection.query("INSERT INTO role SET ?", {"title": title, "salary": salary, "department_id": department_id})
        // would like to only display roles in the department roles were added to
        return this.connection.query ('SELECT title as "Role Title" FROM role');
    }
    rolePrompt(){
        return this.connection.query ('SELECT title as "name", id AS "value" FROM role');
    }
    managerPrompt(){
        return this.connection.query ('SELECT CONCAT_WS (" ",first_name, last_name) as "name", id AS "value" FROM employee WHERE role_id = 1 ');
    }
    addEmployee(first, last, role, manager){
        this.connection.query("INSERT INTO employee SET ?", {"first_name": first, "last_name": last, "role_id": role, "manager_id": manager});
        return this.connection.query('SELECT e.id, e.first_name, e.last_name, d.name AS "Department Name", r.title AS "Role Title" FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id')
    }
}


module.exports = new DB(connection);