USE tracker_db;

--Query for View All Employees
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CASE WHEN manager_id IS NOT NULL THEN (SELECT CONCAT(first_name, ' ', last_name) FROM employee E2 WHERE e2.id=employee.manager_id) WHEN manager_id IS NULL THEN "Self" END AS "Manager"
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;


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