# GitHub Profile Analyzer
FEATURES:
- Fetch GitHub profile
- Analyze repositories
- Calculate developer insights
- Store analysis in MySQL

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
GET /api/profile/:username
GET /api/analysis/:username