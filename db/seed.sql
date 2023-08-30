-- Insert sample departments
INSERT INTO department (name) VALUES 
    ('Sales'),
    ('Unemployment'),
    ('Resistance'),
    ('Dramatic Arts'),
    ('Kick-Ass'),
    ('Caregivers'),
    ('Space Exploration'),
    ('Universe Management');

-- Insert sample roles with unique and humorous titles
INSERT INTO roles (title, salary, department_id) VALUES
    ('Master of Sales Shenanigans', 100000.00, 1),
    ('Professional Handshaker', 0.00, 2),
    ('Coding Wizard', 50000.00, 3),
    ('Dramatic Thespian', 75000.00, 4),
    ('Ninja of Deals', 90000.00, 5),
    ('Chief Snack Officer', 40000.00, 6),
    ('Intergalactic Explorer', 120000.00, 7),
    ('Supreme Empress of the Multiverse', 150000.00, 8);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id, manager_confirm)
VALUES
    ('Jerry', 'Underwood', 1, null, true),
    ('Bob', 'Barker', 1, null, true),
    ('Phil', 'Mckcrackin', 2, null, true),
    ('Tommy', 'Boy', 3, null, true),
    ('Burt', 'Reynolds', 4, null, true),
    ('Chuck', 'Norris', 5, null, true),
    ('Joe', 'Mamma', 6, null, true),
    ('Neil', 'Armstrong', 7, null, true),
    ('She-ra', 'Princess', 8, null, true);

-- Populate manager table
INSERT INTO manager (first_name, last_name)
SELECT first_name, last_name
FROM employee
WHERE manager_confirm = 1;
