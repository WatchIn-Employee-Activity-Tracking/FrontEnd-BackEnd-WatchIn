-- Create database
CREATE DATABASE IF NOT EXISTS watchin_db;
USE watchin_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'employee') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    reset_token VARCHAR(255) NULL,
    reset_token_expires DATETIME NULL
);

-- Insert admin user (password: admin)
INSERT INTO users (first_name, last_name, email, password, role)
VALUES ('Admin', 'User', 'admin@gmail.com', '$2y$10$2Uzla.RFd1tqcIrmagWilOOGs8/EZTygGRIpzGcT3xhwrEgIYThO2', 'admin');

-- Insert Capture Logs Table 
CREATE TABLE IF NOT EXISTS capture_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    image_data LONGBLOB NOT NULL,
    capture_time DATETIME NOT NULL,
    warning_count INT NOT NULL,
    eye_status VARCHAR(20) NOT NULL,
    closed_duration FLOAT NOT NULL,
    open_duration FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; 