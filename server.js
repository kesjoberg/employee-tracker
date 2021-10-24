const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table');
// const { allowedNodeEnvironmentFlags } = require('process');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root2021',
    database: 'tracker_db'
  },
  console.log(`Connected to the tracker_db database.`)
);

// const team =[];

const startQuestions = () =>{
  inquirer
    .prompt([
    {
      type: 'list',
      message:  "What would you like to do?",
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
      name: 'start',
    }
    ])
    .then(response => {
      switch(response.start){
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Quit':
          endQuestions();
          break;
      }
    })   
}
const viewAllEmployees = () =>{
  db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CASE WHEN manager_id IS NOT NULL THEN (SELECT CONCAT(first_name, ' ', last_name) FROM employee E2 WHERE e2.id=employee.manager_id) WHEN manager_id IS NULL THEN "Self" END AS "Manager"
  FROM employee
  JOIN role ON employee.role_id = role.id
  JOIN department ON role.department_id = department.id;`, (err, result) => {
    console.table(result);
    
    startQuestions();
  })
};

const addEmployee = () =>{
  inquirer
    .prompt([
    {
      type: 'input',
      message: " What is the employee's first name?",
      name: 'first_name',
    },
    {
      type: 'input',
      message: "What is the employee's last name?",
      name: 'last_name',
    },
    {
      type: 'list',
      message: "What is the employee's role?",
      choices: [],
      name: 'title',
    },
    {
      type: 'list',
      message: "Who is the employee's manager? (Respond 'None' if this employee is the manager)",
      choices: [],
      name: 'manager',
    },
    ])
    .then(response => {
      
      startQuestions();
    })   
}

const updateEmployeeRole = () =>{
  inquirer
    .prompt([
    {
      type: 'list',
      message: "Which employee's role would you like to update?",
      choices: [],
      name: 'updateEmployee',
    },
    {
      type: 'list',
      message:   "Which role do you want to assign to the selected employee?",
      choices:[],
      name: 'updateRole',
    }
    ])
    .then(response => {
      
      startQuestions();
    })   
};

const viewAllRoles = () =>{
  db.query(`SELECT role.id, role.title, department.name, role.salary FROM role JOIN department ON role.department_id = department.id;`, (err, result) => {
    console.table(result);
    
    startQuestions();
  })
};

const addRole = () =>{
  db.query(`SELECT name, id as value FROM department ORDER BY id`, (err, results) =>{
  inquirer
    .prompt([
    {
      type: 'input',
      message: " What is the name of the role?",
      name: 'title',
    },
    {
      type: 'input',
      message:   "What is the salary of the role?",
      name: 'salary',
    },
    {
      type: 'list',
      message:   "Which department does the role belong to?",
      choices:[...results],
      name: 'department',
    }
    ])
    .then(response => {
      db.query("INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?)", [response.title, response.salary, response.department], (err, res) =>{
        if (err) console.log(err);
        console.log('Role Added');
        console.log('------------------');

        startQuestions()
      })
      
    }) 
  })   
};

const viewAllDepartments = () =>{
  console.log('View All Departments')
  db.query('SELECT * FROM department', (err, result) => {
    console.table(['id', 'name'], result);
    
    startQuestions();
  })
};

const addDepartment = () =>{
  inquirer
    .prompt(
    {
      type: 'input',
      message: " What is the name of the department?",
      name: 'department'
    })
    .then(response => {
      
      console.log(`Added ${response.department} to the database.`);
      startQuestions();
    })   
}
  



const endQuestions =() =>{
  
  console.log('Thank you for using Team Tracker to manage your employees!')
}


startQuestions();