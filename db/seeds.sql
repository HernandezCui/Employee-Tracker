USE company;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE employee;
TRUNCATE TABLE roles;
TRUNCATE TABLE department;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO department(name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('HR');

INSERT INTO roles(title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('HR Manager', 250000, 4),
('HR Representative', 190000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('John', 'Deer', 1, NULL),
('Dave', 'Jones', 2, 1),
('Alexa', 'Rodriguez', 3, NULL),
('Ryan', 'Gomez', 4, 3),
('Malika', 'Brown', 5, NULL),
('Tara', 'Smith', 6, NULL),
('Ricky', 'Bobby', 7, 6);