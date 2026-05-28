# GitHub Profile Analyzer
FEATURES:
- Fetch GitHub profile
- Analyze repositories
- Calculate developer insights
- Store analysis in MySQL

ADDITIONAL FEATURES:
- Profile score system based on repositories, followers, stars, and recent activity
- Recent activity analysis using recently updated repositories
- Developer category prediction based on the most used programming language
- API caching for analysis and users endpoints
- Centralized error handling middleware
- Swagger API documentation available at /api-docs
- MySQL storage for recent activity metrics

TECHNOLOGIES USED:
- Node.js
- Express.js
- MySQL
- GitHub API

INSTALLATION:
## Clone Repository

git clone <repo_link>

## Install Packages

npm install

## Setup Environment Variables

Create .env file

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_analyzer
GITHUB_TOKEN=your_token

## Run Server

npm run dev

API ENDPOINTS:
POST /api/analyze/:username
GET /api/analysis/:username
GET /api/users
GET /api-docs
