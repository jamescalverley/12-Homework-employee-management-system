CREATE DATABASE employee_management;

USE employee_management;

CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL, 
    salary decimal NOT NULL, 
    dept_id INT NOT NULL
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
);
