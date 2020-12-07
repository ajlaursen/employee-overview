const express = require("express");
const inquirer = require( "inquirer" );
const ctable = require("console.table")
const connection = require("./config/connection");
const db = require("./public/dbCalls");
const userPrompts = require( "./public/userPrompts" );

const app = express();
const PORT = process.env.PORT || 3301;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

init()

function init(){
    inquirer.prompt({
        name: "initChoice",
        type: "list",
        message: "Choose an action",
        choices: [
        {
            name: "Veiw all employees",
            value: "veiw_employees"
        },
        {
            name: "Veiw departments",
            value: "veiw_departments"
        },
        {  
            name: "Veiw roles",
            value: "veiw_roles"
        },
        {
            name: "Add department",
            value: "add_departments" 
        },
        {
            name: "Exit",
            value: "exit"
        }
        ]
    }).then( async function(answers)  {
        switch(answers.initChoice){
            case "veiw_employees":
                const emp = await db.viewEmployees();
                console.table(emp)
                init()
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
                // want to use user prompts js file but cannot figure out async functionality to not immediatly run init()
                // userPrompts.addDepartmentPrompt()
                inquirer.prompt({
                    name: "newDepartment",
                    type: "input",
                    message: "Enter department name."
                }).then(async (answers) => {
                    const newDepts = await db.addDepartment(answers.newDepartment);
                    console.table(newDepts)
                    init();
                })
            break;
            case "exit":
                connection.end()
            break;
            
        }
    })
}


