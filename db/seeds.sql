USE tracker_db;

INSERT INTO department (name)
VALUES 
  ("Engineering"),
  ("Finance"),
  ("Legal"),
  ("Sales");

  INSERT INTO role(title, salary, department_id)
  VALUES 
    ("Lead Engineer", 100000, 1),
    ("Accountant Manager", 90000, 2),
    ("Legal Team Lead", 95000, 3),
    ("Sales Manager", 85000,4),
    ("Jr Developer", 50000, 1),
    ("Lawyer", 85000,3);

  INSERT INTO employee(first_name, last_name, role_id, manager_id)
  VALUES
    ("John", "Adams", 1, NULL),
    ("Bob", "Evans", 2, NULL),
    ("Sally", "Jones", 3, NULL),
    ("Jolene", "Marks", 4, NULL),
    ("Harry", "James", 5, 1),
    ("Ellen", "Johnson", 1, 3);