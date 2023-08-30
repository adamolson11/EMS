const inquirer = require('inquirer');
const mysql = require('mysql2');
const {
    dropManagerTable,
    createManagerTable,
    addManagersToTable
} = require('../../Employee-tracker/lib/reset');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees'
});

const viewAllEmployees = () => {
    connection.query(
        // SQL query to retrieve employee data with joins
        `SELECT employee.id, employee.first_name, employee.last_name, roles.title AS role, 
        roles.salary AS salary, manager.first_name AS manager, department.name AS department 
        FROM employee
        LEFT JOIN roles ON employee.role_id = roles.id
        LEFT JOIN department ON roles.department_id = department.id
        LEFT JOIN manager ON employee.manager_id = manager.id`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }
            console.table(results);
            promptUser();
        }
    );
};

const viewEmployeesByDepartment = () => {
    connection.query(
        `SELECT * FROM department`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }
            const departmentNames = results.map(item => item.name);
            inquirer.prompt({
                type: 'list',
                name: 'selectedDepartment',
                message: 'Choose a department to filter from:',
                choices: departmentNames
            }).then(data => {
                connection.query(
                    `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department 
                    FROM employee
                    LEFT JOIN roles ON employee.role_id = roles.id
                    LEFT JOIN department ON roles.department_id = department.id
                    WHERE department.name = ?`,
                    [data.selectedDepartment],
                    function (err, results, fields) {
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
    );
};

const viewEmployeesByManagement = () => {
    connection.query(
        `SELECT * FROM manager`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }
            const managerNames = results.map(item => item.first_name);
            inquirer.prompt({
                type: 'list',
                name: 'selectedManager',
                message: 'Choose a manager to filter from:',
                choices: managerNames
            }).then(data => {
                connection.query(
                    `SELECT employee.id, employee.first_name, manager.first_name AS manager
                    FROM employee
                    LEFT JOIN manager ON employee.manager_id = manager.id
                    WHERE manager.first_name = ?`,
                    [data.selectedManager],
                    function (err, results, fields) {
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
    );
};

const addEmployee = () => {
    connection.query(
        `SELECT * FROM roles`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }
            const roleTitles = results.map(item => item.title);

            connection.query(
                `SELECT * FROM manager`,
                function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                        return;
                    }
                    const managerNames = results.map(item => item.first_name);

                    inquirer.prompt([
                        {
                            type: 'text',
                            name: 'firstName',
                            message: 'Enter the employee\'s first name:'
                        },
                        {
                            type: 'text',
                            name: 'lastName',
                            message: 'Enter the employee\'s last name:'
                        },
                        {
                            type: 'list',
                            name: 'selectedRole',
                            message: 'Select the employee\'s role:',
                            choices: roleTitles
                        },
                        {
                            type: 'confirm',
                            name: 'isManager',
                            message: 'Is the employee a manager?',
                            default: false
                        },
                        {
                            type: 'list',
                            name: 'selectedManager',
                            message: 'Select the employee\'s manager:',
                            choices: managerNames,
                            when: ({ isManager }) => !isManager
                        }
                    ]).then(data => {
                        const selectedRoleIndex = roleTitles.indexOf(data.selectedRole) + 1;
                        let selectedManagerIndex = null;
                        if (!data.isManager) {
                            selectedManagerIndex = managerNames.indexOf(data.selectedManager) + 1;
                        }
                        const managerConfirm = data.isManager ? 1 : 0;

                        connection.query(
                            `INSERT INTO employee (first_name, last_name, role_id, manager_id, manager_confirm)
                            VALUES (?, ?, ?, ?, ?)`,
                            [data.firstName, data.lastName, selectedRoleIndex, selectedManagerIndex, managerConfirm],
                            function (err, results, fields) {
                                if (err) {
                                    console.log(err.message);
                                    return;
                                }
                                dropManagerTable();
                                createManagerTable();
                                addManagersToTable();
                                console.log('Employee added successfully!');
                                promptUser();
                            }
                        );
                    });
                }
            );
        }
    );
};

const updateEmployee = () => {
    connection.query(
        `SELECT * FROM roles`,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }
            const roleTitles = results.map(item => item.title);

            connection.query(
                `SELECT first_name, last_name FROM employee`,
                function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                    }

                    const nameArray = results.map(item => `${item.first_name} ${item.last_name}`);
                    const combinedNameArray = nameArray.filter((item, index) => index % 2 === 0);

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'selectedEmployee',
                            message: 'Select an employee to update:',
                            choices: combinedNameArray
                        },
                        {
                            type: 'list',
                            name: 'selectedRole',
                            message: 'Select a new role for the employee:',
                            choices: roleTitles
                        }
                    ]).then(data => {
                        const selectedRoleIndex = roleTitles.indexOf(data.selectedRole) + 1;
                        const selectedEmployeeNameArray = data.selectedEmployee.split(' ');
                        const selectedFirstName = selectedEmployeeNameArray[0];
                        const selectedLastName = selectedEmployeeNameArray[1];

                        connection.query(
                            `UPDATE employee 
                            SET role_id = ?
                            WHERE first_name = ? AND last_name = ?`,
                            [selectedRoleIndex, selectedFirstName, selectedLastName],
                            function (err, results, fields) {
                                if (err) {
                                    console.log(err.message);
                                    return;
                                }
                                console.log('Employee updated successfully!');
                                promptUser();
                            }
                        );
                    });
                }
            );
        }
    );
};

module.exports = {
    viewAllEmployees,
    viewEmployeesByDepartment,
    viewEmployeesByManagement,
    addEmployee,
    updateEmployee
};
