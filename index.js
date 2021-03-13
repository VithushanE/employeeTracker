const express = require('express')
const inquirer = require('inquirer')
const app = express()
// need to set up connection with the database
const db = require('./app/connection')('company_db', 'password')

// The first step is to ask the user questions 

function firstQuestion() {
    return inquirer.prompt([
        { name: "initalQuestion", message: "What would you like to do today?", type: "list", choices: ["View", "Add", "Update employee roles"] }
    ])

}

// USER CHOOSES TO VIEW OPTIONS 

async function viewOptions() {
    return inquirer.prompt([
        { name: "viewQuestion", mesaage: "What would you like to view?", type: "list", choices: ["departments", "roles", "employees"] }

    ])
}

//1.) if they chooose to view from departments 
async function viewDepartment() {
    let department = await db.query("SELECT * FROM department")
    console.log(department);
    return department;
}


//2.) if they choose to view  role 

async function viewRole() {
    let role = await db.query("SELECT * FROM role")
    return role
}

// 3.) if they want to view employees

async function viewEmployee() {
    let employee = await db.query("SELECT * FROM employee ")
    return employee
}
// **********************************************************************************************************************************
//USER CHOOSES TO ADD

async function addOption() {
    return inquirer.prompt([
        { name: "addQuestion", message: "what would you like to add?", type: "list", choices: ["departments", "roles", "employees"] }
    ])
}

//1.) add department 
async function addDepartment() {
    var departmentInput = await inquirer.prompt([
        { name: "addDepartment", message: "what department would you like to add?", type: "input" }

    ])

    console.log(departmentInput)
    let newValue = await db.query(`INSERT INTO department VALUES(0,"${departmentInput.addDepartment}")`) 
    let result = await db.query(`SELECT * FROM department`)
    return result
}

// 2.) add roles 
async function addRoles() {
    var roleInput = await inquirer.prompt([
        { name: "addRole", message: "What role would you like to add?", type: "input" }
    ])
    var salaryInput = await inquirer.prompt([
        {name:"addSalary", message:"What would the salary be?", type: "input" },
    
    ])
    var departmentInput = await inquirer.prompt([
        {name: "addDepartment", message:"What department are they part of?", type:"input"}
    ])

    console.log(roleInput)
    console.log(salaryInput)
    console.log(departmentInput)
    let newValue1= await db.query(`INSERT INTO role VALUES (0,"${roleInput.addRole}", "${salaryInput.addSalary}", "${departmentInput.addDepartment}")`)
    let result = await db.query(`SELECT * FROM role`)

    return result

}

//3.) add employees 
async function addEmployees() {
    var firstName= await inquirer.prompt([
        { name: "addFirst", message: "What is the employee's first name?", type: "input" }
    ])
    var lastName= await inquirer.prompt([
        { name: "addLast", message: "What is the employee's last name?", type: "input" }
    ])
    var roleId= await inquirer.prompt([
        { name: "addRoleId", message: "What is the employee's role id?", type: "input" }
    ])
    var managerID= await inquirer.prompt([
        { name: "addManager", message: "Is this employee also manager? (1 for no, 2 for yes)", type: "input" }
    ])

    console.log(firstName)
    console.log(lastName)
    console.log(roleId)
    console.log(managerID)
    let value2= await db.query(`INSERT INTO employee VALUES (0,"${firstName.addFirst}", "${lastName.addLast}", "${roleId.addRoleId}", "${managerID.addManager}")`)
    let result = await db.query(`SELECT * FROM employee`)
    return result
}

//****************************************************************************************************************************

// if the user chooses to update information 

async function updateOption() {
    var choice = inquirer.prompt([
        { name: "updateQuestion", message: "Which employee would you like to update?", type: "list", choices: [db.query(`SELECT * FROM employee`)] }
    ])

    console.log(choice)
}


// to go back a step 
function backContinue() {
    return inquirer.prompt([
        { name: "action", message: "Would you like to continue?", type: "confirm" }
    ])
}
// Logic to decide what the user wishes to view 
async function main() {
    const result = await firstQuestion()
    console.table(result)
    if (result.initalQuestion === "View") {
        let data = await viewOptions()
        console.log('[data]', data)

        if (data.viewQuestion === "departments") {
            let data = await viewDepartment()
            console.table(data)
            let result = await backContinue()
            console.log(result)

            if (result.action === true) {
                main()
            }
            return;

        } else if (data.viewQuestion === "roles") {
            console.log('Showing all company roles')
            let data = await viewRole()
            console.table(data)
            let result = await backContinue()
            console.log(result)

            if (result.action === true) {
                main()
            } return;

        } else {
            console.log('Showing all company employees')
            let data3 = await viewEmployee()
            console.table(data3)
            let result = await backContinue()
            console.log(result)

            if (result.action === true) {
                main()
                return
            };
        } return;
    }
     if (result.initalQuestion === "Add") {
        let data = await addOption()
        console.log(data.addQuestion)

        if (data.addQuestion === 'departments') { 
            let result = await addDepartment()
            console.table(result)

            let move = await backContinue()
            console.log(result)

            if (move.action === true) {
                main()
            }
            return;
        }
        else if (data.addQuestion ==='roles' ){
        let result1 = await addRoles()
        console.log(result1)

        let move1 = await backContinue()
            console.log(result)

            if (move1.action === true) {
                main()
        } return; 
    }
    else {

        let result2 = await addEmployees()
        console.log(result2)

        let move1 = await backContinue()
            console.log(result)

            if (move1.action === true) {
                main()
        } return; 
    }
}
if (result.initalQuestion === "Update employee roles"){
    let result3 = await updateOption()
    console.log(result3)

    let move2 = await backContinue()
    console.log(result)

    if (move2.action === true) {
        main()
} return; 

}

}


main();
