import inquirer = require ("inquirer")

inquirer.prompt([

    {

        type: 'list',
        questions: 'questions',
        message: 'What would you like to do? ',
        choices: [
        "View All Employees", 
        "Add Employee", 
        "Update Employee Role",
        "View All Roles", 
        "Add Role",
        "View All Departments",
        "Add Department"
    ],
      
    
    } ])

    .then(answers =>{
        console.log('You selected:', answers.questions);})
        .catch(error => {
            console.error("Error occured:", error);
        })






//
//(Move up and down to reveal more choices)

//will need conditional statements 



