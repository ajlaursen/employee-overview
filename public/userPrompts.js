const inquirer = require( "inquirer" );
const db = require("./dbCalls");



 
function addDepartmentPrompt(){
        inquirer.prompt({
            name: "newDepartment",
            type: "input",
            message: "Enter department name."
        }).then(async (answers) => {
            const newDepts = await db.addDepartment(answers.newDepartment);
            console.table(newDepts)
            
        })
    }




module.exports = {
    addDepartmentPrompt: addDepartmentPrompt
}