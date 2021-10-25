const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root2021',
    database: 'tracker_db'
  },
  console.log(`Connected to the tracker_db database.`)
);


class Queries{
  getManagers(){
    db.query(`SELECT CONCAT(first_name,' ',last_name) as "Manager", id as value
    FROM employee
    WHERE employee.manager_id IS NULL`, (err, result) =>{
      if (err) console.log(err);
      return result;
    })
  };

  getEmployees(){
    db.query(`SELECT CONCAT(first_name,' ',last_name) as "Employee", id as value
    FROM employee`, (err, results) => {
      if (err) console.log(err);
      return result;
    })
  }
  
  getRoles(){
    db.query(`SELECT title, id as value FROM role`, (err, results) =>{
      if (err) console.log(err);
      return result;
    })
  };

  showAllEmployees(){
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CASE WHEN manager_id IS NOT NULL THEN (SELECT CONCAT(first_name, ' ', last_name) FROM employee E2 WHERE e2.id=employee.manager_id) WHEN manager_id IS NULL THEN "Self" END AS "Manager"
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id;`, (err, result) =>{
      if (err) console.log(err);
      console.table(result);
    });
  };

  showAllDepartments(){
    db.query(`SELECT id, name FROM department;`, (err, result)=>{
      if (err) console.log(err);
      return result;
    });
  };

  
};

module.exports = new Queries