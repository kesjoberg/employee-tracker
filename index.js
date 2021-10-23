const inquirer = require('inquirer');
const fs = require('fs');
const { allowedNodeEnvironmentFlags } = require('process');

const team =[];

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
      switch(response){
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

};

const addRole = () =>{
  inquirer
    .prompt([
    {
      type: 'list',
      message: " What is the name of the role?",
      choices: [],
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
      choices:[],
      name: 'department',
    }
    ])
    .then(response => {
      
      startQuestions()
    })   
}

const viewAllDepartments = () =>{

};

const addDepartment = () =>{
  inquirer
    .prompt(
    {
      type: 'input',
      message: " What is the name of the department?",
      name: 'department',
    });
    
    .then(response => {
      
      console.log(`Added ${response.department} to the database.`)
      startQuestions()
    })   
}
  
const askMoreTeamMembers = ()=> {
  inquirer
    .prompt(
      {
        type: 'list',
        message:  "Select the next team member you would like to complete or select 'Finish' if you are done building your team.",
        choices: [ 'Engineer', 'Intern', 'Finished'],
        name: 'role',
      })
     .then(response => {
      if(response.role === 'Engineer'){
        engineerQuestions();
      } else if(response.role === 'Intern') {
        internQuestions();
      } else {
        endQuestions();
      }
     })
}


const endQuestions =() =>{
  buildTeam();
  console.log('Thank you for building your team, please go to the dist folder and find team.html to view your team.')
}


startQuestions();