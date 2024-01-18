USE company; 

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE employee;
TRUNCATE TABLE roles;
TRUNCATE TABLE department;
SET FOREIGN_KEY_CHECKS = 1; 

INSERT INTO department(name) VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles(tile, salary, department_id) VALUES
('Sales lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Mike', 'Chan', 2, 2),
('Ashley', 'Rodriguez', 3, NULL),
('Kevin', 'Tupik', 4, 1),
('Malia', 'Brown', 5, NULL),
('Sarah', 'Lourd', 6, NULL),
('Tom', 'Allen', 7, 2),
('Christian', 'Eckenrode', 3, 3);
