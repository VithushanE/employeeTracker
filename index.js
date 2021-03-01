const express = require('express')
const app = express()
const inquirer = require('inquirer')

// need to set up connection with the database
const db = require('./app/connection')('company', 'password')

// The first step is to ask the user questions 

function intentionQuestion (){
    return inquirer.prompt([
        {name: "firstOption", message: "What would you like to do?", type:"list", 
        options:["view details", "update info", "add info ",] }
    ])
}

// after asking what is their intention, prepare next set of questions after
async function viewDetails (){
    return await inquirer.prompt([
        { name: "viewDetails", message:"What would you like to view?", type:"list", 
            options:["Employees", "Departments", "Roles" ]
        }
    ])
} 

