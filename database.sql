CREATE DATABASE serene_salon;

USE serene_salon;

CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  service VARCHAR(100) NOT NULL
);
