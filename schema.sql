DROP DATABASE IF EXISTS company_db; 
CREATE DATABASE company_db; 

USE company_db; 



CREATE TABLE department (
id INT AUTO_INCREMENT PRIMARY KEY, 
name VARCHAR(30) 
); 

INSERT INTO department VALUES (1, "accounting"); 
INSERT INTO department VALUES (2, "marketing"); 
INSERT INTO department VALUES (3, "human resource"); 
INSERT INTO department VALUES (4, "manager"); 
INSERT INTO department VALUES(0,'test');
CREATE TABLE role (
id INT PRIMARY KEY, 
title VARCHAR(30), 
salary DECIMAL (10,2), 
department_id INT 
); 

CREATE TABLE employee (
id INT PRIMARY KEY, 
first_name VARCHAR(30), 
last_name VARCHAR(30), 
role_id INT, 
manager_id INT 
); 

INSERT INTO employee VALUES (1, "Adam", "silver", 1, 1); 
INSERT INTO employee VALUES (2, "Brother", "andrews",1, 2); 
INSERT INTO employee VALUES (3, "Cider", "Vinegar", 1, 1); 

SELECT * FROM department;

-- 1 means employee 
-- 2 means 

-- accounting - 1 
-- marketing - 2 
-- hr - 3 
INSERT INTO role VALUES (1, "accountant", 50000.00, 1); 
INSERT INTO role VALUES (2, "accounting associate", 30000.00, 1); 
INSERT INTO role VALUES (3, "Marketing specialist", 50000.00, 2); 
INSERT INTO role VALUES (4, "Marketing Associate", 40000.00, 2); 
INSERT INTO role VALUES (5, "human resource specialist", 50000.00, 2); 
INSERT INTO role VALUES (6, "human resource assoicate", 40000.00, 3);
INSERT INTO role VALUES (7, "Manager", 50000.00, 4);
INSERT INTO role VALUES (8, "enginner", 60000.00, 3);

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department; 


