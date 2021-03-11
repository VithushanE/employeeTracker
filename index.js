const express = require('express')
const inquirer = require('inquirer')
const app = express()
// need to set up connection with the database
const db = require('./app/connection')('company_db', 'password')

// The first step is to ask the user questions 

function firstQuestion(){
   return inquirer.prompt([
        {name:"initalQuestion", message: "What would you like to do today?", type: "list", choices: ["View", "Add", "Update employee roles"] }
   ])

}

// If the user chooses to view 

async function viewOptions(){
    return inquirer.prompt([
        {name:"viewQuestion", mesaage: "What would you like to view?", type: "list", choices: ["departments", "roles", "employees"]}
               
    ])
}

//1.) if they chooose to view from departments 
async function viewDepartment(){
    let department = await db.query("SELECT * FROM department")
    console.log( department);
    return department;
}


//2.) if they choose to view  role 

async function viewRole(){
    let role = await db.query("SELECT * FROM role")
    return role 
}

// 3.) if they want to view employees

async function viewEmployee(){
    let employee= await db.query("SELECT * FROM employee ")
    return employee 
}
// **********************************************************************************************************************************
//if the user chooses to add  

async function addOption(){
    return inquirer.prompt([
        {name:"addQuestion", message: "what would you like to add?", type: "list", choices: ["departments, roles, employees"]}
    ])
}

//1.) add department 
async function addDepartment(){
    return inquirer.prompt([
        {name:"addDepartment", message: "what department would you like to add?", type:"input"}
    ])

}

// 2.) add roles 
async function addRoles(){
    return inquirer.prompt([
        {name:"addRoles", message: "What role would you like to add?", type: "input"}
    ])
}

//3.) add employees 
async function addEmployees(){
    return inquirer.prompt([
        {name: "addEmployee", message:"What employee would you like to add", type:"list", choices: ["accountant", "marketing", "human resource"]}
    ])
}

// if the user chooses to update information 

async function updateOption(){
    return inquirer.prompt([
        {name:"updateQuestion", message: "who would you like to update?", type: "list", choices: ["accountant", "marketing", "human resource"]}
    ])
}

function backContinue(){
    return inquirer.prompt([
        {name:"action", message: "Would you like to continue?", type:"confirm" }
    ])
}
// Logic to decide what the user wishes to view 
async function main(){
    const result = await firstQuestion()
    console.table(result)
        if (result.initalQuestion === "View"){
       let data= await viewOptions()
       console.log('[data]',data)

       if (data.viewQuestion === "departments"){
           let data = await viewDepartment()
           console.table(data)
           let result = await backContinue()
           console.log(result)
        if (result.action=== true){
            main() 
        } 
            return;
        
       } else if (data.viewQuestion === "roles"){
           console.log('im here')
           let data = await viewRole() 
           console.table(data)
          
       } else {
       console.log('check')
       let data3 = await viewEmployee()
       console.table(data3)
       return};

        } return;


} 

main();
