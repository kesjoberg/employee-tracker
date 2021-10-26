USE tracker_db;

--Query for View All Employees
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) as manager
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee manager ON manager.id= employee.manager_id

-- Query for View All Roles
SELECT role.id, role.title, department.name, role.salary
FROM role
JOIN department ON role.department_id = department.id;

-- Query for View All Departments
SELECT id, name FROM department;

-- Query for listing managers
SELECT CONCAT(first_name,' ',last_name) as "Manager", id as value
FROM employee
WHERE employee.manager_id IS NULL