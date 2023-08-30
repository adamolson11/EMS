const inquirer = require('inquirer');
const mysql = require('mysql2');
const { promptUser } = require('../index');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees'
});

const addTotalByDep = () => {
    connection.query(`SELECT * FROM department`,
        function (err, results) {
            if (err) {
                console.log(err.message);
                return;
            }

            const departmentNames = results.map(item => item.name);

            inquirer
                .prompt({
                    type: 'list',
                    name: 'selectedDepartment',
                    message: 'Select a department to view total salaries:',
                    choices: departmentNames
                })
                .then(data => {
                    let department_id;
                    for (let i = 0; i < departmentNames.length; i++) {
                        if (departmentNames[i] === data.selectedDepartment) {
                            department_id = i + 1;
                        };
                    };

                    connection.query(
                        `SELECT department.name AS department, SUM(roles.salary) AS total_salary
                        FROM employee
                        LEFT JOIN roles
                        ON employee.role_id = roles.id
                        LEFT JOIN department
                        ON roles.department_id = department.id
                        WHERE department_id = ?`,
                        [department_id],
                        function (err, results) {
                            if (err) {
                                console.log(err.message);
                                return;
                            }

                            console.table(results);
                            promptUser();
                        }
                    );
                });
        }
    )
};

module.exports = { addTotalByDep };
