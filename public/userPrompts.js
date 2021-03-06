const inquirer = require( "inquirer" );
const db = require("./dbCalls");


class UserPrompts{
 constructor(userPrompts){
     this.userPrompts = userPrompts
 }

addDepartmentPrompt(){
      return  inquirer.prompt({
            name: "newDepartment",
            type: "input",
            message: "Enter department name."
        }).then(async (answers) => {
            const newDepts = await db.addDepartment(answers.newDepartment);
            console.table(newDepts)
            return newDepts
        })
    }

}




module.exports = UserPrompts