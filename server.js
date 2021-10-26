const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const inquirer = require('inquirer');
const cTable = require('console.table');


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

console.log(`
  ==========================================================
               Welcome to Employee Tracker!
  ==========================================================`)


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
      };
    });   
};
const viewAllEmployees = () =>{
  db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) as manager
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager ON manager.id= employee.manager_id;`, (err, result) => {
    console.table(result);
    
    startQuestions();
  })
};



const addEmployee = () =>{
  let managers = [];
  db.query(`SELECT CONCAT(first_name,' ',last_name) as "name", id as value
  FROM employee
  WHERE employee.manager_id IS NULL`, (err, result) => {
    let name = {name: "None", value: null}
    managers = result;
    managers.unshift(name);

    db.query(`SELECT title as name, id as value FROM role`, (err, results) =>{
      
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
          choices: [...results],
          name: 'title',
        },
        {
          type: 'list',
          message: "Who is the employee's manager? (Select 'None' if this employee is the manager)",
          choices: [...managers],
          name: 'manager',
        },
        ])
        .then(response => {
          db.query("INSERT INTO employee(first_name, last_name, role_id,manager_id) VALUES(?, ?, ?, ?)", [response.first_name, response.last_name, response.title, response.manager], (err, res) =>{
            if (err) console.log(err);
            console.log(`
            -----Added ${response.first_name} as an employee to the database.-----
            `)
          startQuestions();
        })  
      })
    }) 
  }) 
}

const updateEmployeeRole = () =>{
  let roles = [];
  db.query(`SELECT title as name, id as value FROM role`, (err, results) =>{
    roles = results;

    db.query(`SELECT CONCAT(first_name,' ',last_name) as "name", id as value
    FROM employee`, (err, results) => {
      

    inquirer
      .prompt([
      {
        type: 'list',
        message: "Which employee's role would you like to update?",
        choices: [...results],
        name: 'updateEmployee',
      },
      {
        type: 'list',
        message:   "Which role do you want to assign to the selected employee?",
        choices:[...roles],
        name: 'updateRole',
      }
      ])
      .then(response => {
        db.query("UPDATE employee SET role_id =? WHERE id = ?",[response.updateRole, response.updateEmployee] , (err, res) =>{
          if (err) console.log(err);
          console.log(`
          -----Updated ${response.updateEmployee} in the database.-----
          `)
        startQuestions();
      })  
    })
  }) 
}) 
}

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
        console.log(`-----Added ${response.title} as a role to the database.-----`);

        startQuestions()
      })
      
    }) 
  })   
};

const viewAllDepartments = () =>{
  console.log('----All Departments-----')
  db.query('SELECT id, name FROM department', (err, result) => {
    console.table(result);
    
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
      db.query("INSERT INTO department(name) VALUES(?)", response.department, (err, res) =>{
        if (err) console.log(err);
       
        console.log(`
        -----Added ${response.department} as a department to the database.-----
        `);
      startQuestions();
    }) 
  })   
}
  
const endQuestions =() =>{
  
  console.log(`
  ==========================================================
  Thank you for using Team Tracker to manage your employees!
  ==========================================================`)
 process.exit();
}


startQuestions();