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
    ("Sales, Manager", 85000,4);

  INSERT INTO employee(first_name, last_name, role_id)
  VALUES
    ("John", "Adams", 1),
    ("Bob", "Evans", 2),
    ("Sally", "Jones", 3),
    ("Jolene", "Marks", 4);