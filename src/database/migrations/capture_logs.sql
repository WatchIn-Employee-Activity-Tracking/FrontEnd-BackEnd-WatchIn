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