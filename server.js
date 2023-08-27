const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'root',
    database: 'EMS'

});


const init = async () => {

    const results = await connection.promise().query(
`INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUES 
('Leonardo', 'Turtle', 'Ninja', 'Sewers', '2000.00', 'splinter')`,

    )

const department = await connection.promise().query

('SELECT * FROM department')


console.log(department)
 
}

init()