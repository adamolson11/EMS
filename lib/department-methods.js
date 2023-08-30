const inquirer = require('inquirer');
const mysql = require('mysql2');
const { promptUser } = require('../index.js');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees'
});

// View department
const viewDepartments = () => {
    connection.query(
        `SELECT * FROM department`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }

            console.table(results);
            promptUser();
        }
    )
}

// Add department
const addDepartment = () => {
    inquirer
        .prompt({
            type: 'text',
            name: 'departmentName',
            message: 'Please enter the name of the department you would like to add:'
        })
        .then((data) => {
            connection.query(
                `INSERT INTO department (name)
                VALUES(?)`,
                [data.departmentName],
                function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                        return;
                    }

                    console.log('Department added successfully!');
                    promptUser();
                }
            )
        })
}

module.exports = { viewDepartments, addDepartment };
