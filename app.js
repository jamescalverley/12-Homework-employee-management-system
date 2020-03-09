const inquirer = require('inquirer');

class Employee {
    constructor( firstName, lastName, roleId, managerId ){
        this.firstName = firstName, 
        this.lastName = lastName, 
        this.roleId = roleId, 
        this.managerId = managerId
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
            choices: ['Add Departments', 'View Departments', 'Add Roles', 'View Roles', 'Add Employees', 'View Employees', 'Update Employees', 'QUIT']
        }
    ])
    let initResp = resp.initPrompt;
    console.log(initResp);

    if( initResp == "QUIT"){
    process.exit(0);
    } if( initResp == "Add Departments"){
        addDepartments();
    } if( initResp == "View Departments"){
        viewDepartments();
    } if( initResp == "Add Roles"){
        addRoles();
    } if( initResp == "View Roles"){
        viewRoles();
    } if( initResp == "View Employees"){
        viewEmployees();
    } if( initResp == "Add Employees"){
        addEmployees();
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
};

async function viewRoles(){
    console.log("[>>> viewRoles Fn ]")
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

    const firstName = resp.firstName;
    const lastName = resp.lastName;
    const role = resp.role;

    console.log(firstName, lastName, role)

};


async function viewEmployees(){
    console.log("[>>> viewEmployees Fn ]")
};





async function updateEmployees(){
    console.log("[>>> updateEmployees Fn ]")
}

main();

