DROP DATABASE IF EXISTS EMS_db;
CREATE DATABASE EMS_db;

USE EMS_db;

CREATE TABLE employee (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR(30),
    last_name VARCHAR(30), 
    title VARCHAR(50), 
    department VARCHAR(50), 
    salary DECIMAL(10, 2),
    manager INT
);

CREATE TABLE department (
    id INT PRIMARY KEY  NOT NULL AUTO_INCREMENT,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT
);
