const connection = require('../config/connection');

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
}


module.exports = new DB(connection);