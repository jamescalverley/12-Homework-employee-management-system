const mysql = require('mysql');

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
async function addRole( role ){
    const roleAdd = await db.query(
        'INSERT INTO roles (title,salary,dept_id) VALUES(?,?,?)', [role.title, role.salary, role.department])
    console.log("[ADDED to db]", role.title);
    return roleAdd
};
async function displayRoles(){
    console.log("displaying roles");
    const roleList = await db.query(
        'SELECT * FROM roles ORDER BY id')
    return roleList
}


async function createEmployee( employee ){
    let employeeTest = [employee.firstName, employee.lastName, employee.roleId];
    console.log("[orm employee data to add]", employeeTest);
    const employeeAdd = await db.query(
        'INSERT INTO employees (first_name,last_name,role_id) VALUES(?,?,?)', [employee.firstName, employee.lastName, employee.roleId]);
    console.log("[ADDED TO db]", employee.firstName)
    return employeeAdd
};

async function displayEmployees(){
    console.log("[displaying employees]");

    const employeeList = await db.query(
        'SELECT * FROM employees ORDER BY id')
    return employeeList
};

async function deleteEmployee( employee ){
    let employeeTest = [employee.id, employee.firstName, employee.lastName, employee.roleId];
    console.log("[orm employee to delete]", employeeTest);
    const toDelete = db.query(
        'DELETE FROM employees WHERE id=?', [employee.id] )
    return toDelete

    
}

module.exports = {
    createEmployee,
    displayEmployees,
    deleteEmployee,
    addRole,
    displayRoles
}
    
