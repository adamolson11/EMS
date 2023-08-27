-- Insert sample departments
INSERT INTO department (name) VALUES 
    ('Game Show Host'),
    ('unemployed'),
    ('not taking no for an answer'),
    ('actorish'),
    ('ass kicker'),
    ('caretaker'),
    ('Spaceman'),
    ('Most powerful woman in the Universe');

-- Insert sample roles
INSERT INTO role (title, salary, department_id) VALUES
    ('Game Show Host', 100000.00, 1),
    ('unemployed', 0.00, 2),
    ('not taking no for an answer', 50000.00, 3),
    ('actorish', 75000.00, 4),
    ('ass kicker', 90000.00, 5),
    ('caretaker', 40000.00, 6),
    ('Spaceman', 120000.00, 7),
    ('Most powerful woman in the Universe', 150000.00, 8);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUES
    ('Bob', 'Barker', 'Game Show Host', 'Game Show Host', 100000.00, NULL),
    ('Phil', 'Mckcrackin', 'unemployed', 'unemployed', 0.00, NULL),
    ('Tommy', 'Boy', 'not taking no for an answer', 'not taking no for an answer', 50000.00, NULL),
    ('Burt', 'Reynolds', 'actorish', 'actorish', 75000.00, NULL),
    ('Chuck', 'Norris', 'ass kicker', 'ass kicker', 90000.00, NULL),
    ('Joe', 'Mamma', 'caretaker', 'caretaker', 40000.00, NULL),
    ('Neil', 'Armstrong', 'Spaceman', 'Spaceman', 120000.00, NULL),
    ('She-ra', '', 'Most powerful woman in the Universe', 'Most powerful woman in the Universe', 150000.00, NULL);
