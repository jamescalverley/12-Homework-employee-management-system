const inquirer = require('inquirer');
const mysql = require('mysql');

const orm = require( './orm' );

class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args=[] ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
  }
// at top INIT DB connection
const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employee_management"
});


//* Classes ==============
class Employee {
    constructor( firstName, lastName, roleId ){
        this.firstName = firstName, 
        this.lastName = lastName, 
        this.roleId = roleId
        // this.managerId = managerId // add back managerId to inputs 
    }
};

class Role {
    constructor( title, salary, department ){
        this.title = title,
        this.salary = salary,
        this.department = department
    }
};

//? TEST ----------
// let testEmployee = new Employee( 'James', 'Calverley', 001, 243);
// console.log(testEmployee);

async function main(){
    
    const resp = await inquirer.prompt([
        {
            name: 'initPrompt',
            message: "What would you like to do?",
            type: 'list',
            choices: ['Add Department', 'View Departments', 'Add Role', 'View Roles', 'Add Employee', 'Delete Employee', 'View Employees', 'Update Employees', 'QUIT']
        }
    ])
    let initResp = resp.initPrompt;

    if( initResp == "QUIT"){
    process.exit(0);
    } if( initResp == "Add Department"){
        addDepartments();
    } if( initResp == "View Departments"){
        viewDepartments();
    } if( initResp == "Add Role"){
        addRoles();
    } if( initResp == "View Roles"){
        viewRoles();
    } if( initResp == "View Employees"){
        viewEmployees();
    } if( initResp == "Add Employee"){
        addEmployees();
    } if( initResp == "Delete Employee"){
        deleteEmployee();
    } if( initResp == "Update Employees"){
        updateEmployees();
    }
}

async function addDepartments(){
    console.log("[>>> addDepartments Fn ]")
};

async function viewDepartments(){
    console.log("[>>> viewDepartments Fn ]")
};

async function addRoles(){
    console.log("[>>> addRoles Fn ]")

    const resp = await inquirer.prompt([
        {
            name: 'titleAdd',
            message: 'What role would you like to add?',
            type: 'input'
        },
        {
            name: 'salaryAdd',
            message: 'What is the salary for the role?',
            type: 'input'
        },
        {
            name: 'departAdd',
            message: 'What department is this role in?',
            type: 'input'
        }
    ])

    const newRole = new Role( resp.titleAdd, resp.salaryAdd, resp.departAdd );
    console.log("[NEW ROLE]", newRole )

    await orm.addRole( newRole);

    console.log(`Added Role: ${resp.titleAdd}`);

    await main();
};

async function viewRoles(){
    console.log("[>>> viewRoles Fn ]")

    const roleDisplayList = await orm.displayRoles();
    
    roleDisplayList.forEach( (row) => {
        console.log(`${row.title} ${row.salary} ${row.dept_id}`)
    })
    await main();
};

async function addEmployees(){
    console.log("[>>> addEmployees Fn ]")

    const resp = await inquirer.prompt([
        {
            name: 'firstName',
            message: "What is the employee's first name?",
            type: 'input'
        },
        {
            name: 'lastName',
            message: "What is the employee's last name?",
            type: 'input'
        },
        {
            name: 'role',
            message: "What is the employee's role?",
            type: 'input'
        }
    ])
    const addEmployee = new Employee( resp.firstName, resp.lastName, resp.role );
    console.log("[NEW EMPLOYEE]", addEmployee )
    
    await orm.createEmployee( addEmployee );
    console.log(`Added Employee: ${resp.firstName} ${resp.lastName}`);

    await main();
};
async function viewEmployees(){
    console.log("[>>> viewEmployees Fn ]")
    const employeeDisplayList = await orm.displayEmployees();
    
    employeeDisplayList.forEach( (row) => {
        console.log(`${row.first_name} ${row.last_name} ${row.role_id}`)
    })
    await main();
};
async function deleteEmployee(){
    console.log("[>>> deleteEmployee Fn ]")
    const employeeList = await orm.displayEmployees();
    console.log("[employee list]", employeeList)
    
    const displayList = [];

    employeeList.forEach( (row) => {
        displayList.push((`${row.first_name} ${row.last_name}  ID: ${row.id}`))
    })

    const resp = await inquirer.prompt([
        {
            name: 'toDelete',
            message: "Which employee would you like to delete?",
            type: 'list', 
            choices: displayList
        }
    ])
    const toDelete = resp.toDelete;
    console.log("[employee to delete:]", toDelete)

    await orm.deleteEmployee( toDelete );
};

async function updateEmployees(){
    console.log("[>>> updateEmployees Fn ]")
}

main();

