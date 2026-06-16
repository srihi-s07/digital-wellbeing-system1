CREATE DATABASE wellbeing_db;
 
USE wellbeing_db;
 
CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);
 
CREATE TABLE activities(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    activity_name VARCHAR(100),
    category VARCHAR(50),
    hours_spent DECIMAL(5,2),
    activity_date DATE,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
 
CREATE TABLE goals(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    goal_name VARCHAR(100),
    target_hours INT,
    status VARCHAR(50),
    FOREIGN KEY(user_id) REFERENCES users(id)
);
 
CREATE TABLE reports(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    productivity_score DECIMAL(8,2),
    report_date DATE,
    FOREIGN KEY(user_id) REFERENCES users(id)
);
