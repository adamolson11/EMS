const inquirer = require('inquirer');
const {dropManagerTable, createManagerTable,addManagers, connection} = require ("./lib/reset")
require ("console.table")
connection.connect(function(err){
    if(err)console.error(err)
    console.log("Employee tracker")
promptUser()
})
// Initial Prompt - Main Menu
const promptUser = () => {
    inquirer

        // Prompt the user
        .prompt({
            type: 'list',
            name: 'begin choices',
            message: 'What would you like to do? (Select on of the following)',
            choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Update Employee Role', 'View Departments', 'Add Department', 'View Roles', 'Add Role', 'View totalized budget', 'I am finished']
        })
        // Take the data and use switch statements to decide what to do per option
        .then((data) => {
            switch (data['begin choices']) {
                case 'View All Employees':
                    viewAllEmp();
                    break;
                case 'View All Employees By Department':
                    viewEmpByDep();
                    break;
                case 'View All Employees By Manager':
                    viewEmpByMngt();
                    break;
                case 'Add Employee':
                    addEmp();
                    break;
                case 'Update Employee Role':
                    upEmp();
                    break;
                case 'View Departments':
                    viewDep();
                    break;
                case 'Add Department':
                    addDep();
                    break;
                case 'View Roles':
                    viewRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View totalized budget':
                    addTotalByDep();
                    break;
                case 'I am finished':
                   connection.end()
                   process.exit(0)
            }
        })
};

// You must export your module before you require module for circular page being required
// module.exports = { promptUser }
// const { viewAllEmp, viewEmpByDep, viewEmpByMngt, addEmp, upEmp } = require('./lib/employee');
// const { viewDep, addDep } = require('./lib/department-methods');
// const { viewRoles, addRole } = require('./lib/roles-methods');
// const { addTotalByDep } = require('../Employee-tracker/lib/calculations');

// promptUser()


const viewDep = () => {
    connection.query("SELECT * from department;",
    function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
        console.table(results);

        promptUser()
    })
}



const viewRoles = () => {
    connection.query("SELECT * from Roles;",
    function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
        console.table(results);

        promptUser()
    })
}



const viewAllEmp = () => {
    connection.query("SELECT * from employee;",
    function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
        console.table(results);

        promptUser()
    })
}

const addDep = () => {
    inquirer.prompt([
        {
            type:"input",
            name:"Department_Name",
            message: "enter the department name",
            

        }
    ])
    .then(response =>{

        connection.query("INSERT INTO department (name) VALUES(?); ",response.Department_Name,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
            console.table(results);
    
            promptUser()
        })
    })

}


const addRole = () => {
    inquirer.prompt([
        {
            type:"input",
            name:"Role_Name",
            message: "enter the role name",
            

        }
    ])
    .then(response =>{

        connection.query(" INSERT INTO roles (title) VALUES(?); ",response.Role_Name,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
            console.table(results);
    
            promptUser()
        })
    })

}



const addEmp = () => {
    inquirer.prompt([
        {
            type:"input",
            name:"Employee_Name",
            message: "enter the new employee first and last name",
            

        }
    ])

    .then(response =>{

        connection.query("INSERT INTO employee (first_name) VALUES(?); ",response.Employee_Name,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
            console.table(results);
    
            promptUser()
        })
    })

}


const upEmp = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the ID of the employee you want to update:',
        },
        {
            type: 'input',
            name: 'newRoleId',
            message: 'Enter the new role ID for the employee:',
        },
    ])
    .then((response) => {
        const { employeeId, newRoleId } = response;
        const updateQuery = "UPDATE employee SET role_id = ? WHERE id = ?";

        connection.query(updateQuery, [newRoleId, employeeId], (err, results) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`Employee with ID ${employeeId} has been updated to the new role.`);
            }

            promptUser();
        });
    });
}


