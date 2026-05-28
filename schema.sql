CREATE DATABASE github_analyzer;
USE github_analyzer;

CREATE TABLE github_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  name VARCHAR(150),
  bio TEXT,
  followers INT,
  following_count INT,
  public_repos INT,
  profile_url VARCHAR(255),
  avatar_url VARCHAR(255),
  created_at_github DATETIME,
  analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE github_analysis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  total_stars INT,
  total_forks INT,
  top_language VARCHAR(100),
  languages_used TEXT,
  top_repo VARCHAR(150),
  developer_type VARCHAR(100),
  profile_score INT,
  recent_repos_count INT,
  recent_activity_score INT,
  last_pushed_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

