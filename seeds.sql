-- Insert sample departments
INSERT INTO department (name) VALUES 
    ('Game Show Host Department'),
    ('Unemployment Office'),
    ('Resistance Against No Department'),
    ('Dramatic Arts Department'),
    ('Kick-Ass Division'),
    ('Caregivers Guild'),
    ('Space Exploration Department'),
    ('Most Dominant Universe Management Team');

-- Insert sample roles with unique and humorous titles
INSERT INTO role (title, salary, department_id) VALUES
    ('Master of Sales Shenanigans', 100000.00, 1),
    ('Professional Handshaker', 0.00, 2),
    ('Coding Wizard', 50000.00, 3),
    ('Dramatic Thespian', 75000.00, 4),
    ('Ninja of Deals', 90000.00, 5),
    ('Chief Snack Officer', 40000.00, 6),
    ('Intergalactic Explorer', 120000.00, 7),
    ('Supreme Empress of the Multiverse', 150000.00, 8);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUES
    ('Bob', 'Barker', 'Master of Sales Shenanigans', 'Game Show Host Department', 100000.00, NULL),
    ('Phil', 'Mckcrackin', 'Professional Handshaker', 'Unemployment Office', 0.00, NULL),
    ('Tommy', 'Boy', 'Coding Wizard', 'Resistance Against No Department', 50000.00, NULL),
    ('Burt', 'Reynolds', 'Dramatic Thespian', 'Dramatic Arts Department', 75000.00, NULL),
    ('Chuck', 'Norris', 'Ninja of Deals', 'Kick-Ass Division', 90000.00, NULL),
    ('Joe', 'Mamma', 'Chief Snack Officer', 'Caregivers Guild', 40000.00, NULL),
    ('Neil', 'Armstrong', 'Intergalactic Explorer', 'Space Exploration Department', 120000.00, NULL),
    ('She-ra', 'Princess', 'Supreme Empress of the Multiverse', 'Most Dominant Universe Management Team', 150000.00, NULL);
