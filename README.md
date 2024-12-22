# Payment API

## Project Overview
A system that processes user payments monthly where each user is allowed to have only one active payment in a month.

The server was developed following the MVC design pattern using **Node.js, MongoDB, & Express.js**. All code is properly documented using JSDoc best practices.

## Prerequisites
- Docker and Docker Compose installed on your machine 🐳
- Git for cloning the repository

## Environment Setup
Create a `.env` file in the root directory with the following variables:
```env
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# Database Configuration
MONGO_URI=mongodb://mongo:27017/payment_system

# API Configuration
API_EMAIL_PROVIDER=your_email_provider
API_GUARD=your_api_guard
API_GUARD_PASS=your_api_guard_password
```

## Running with Docker Compose

1. Build and start the containers:
```bash
docker-compose up --build
```

2. Start in detached mode (runs in background):
```bash
docker-compose up -d
```

3. Stop the containers:
```bash
docker-compose down
```

4. View logs:
```bash
docker-compose logs -f
```

The application will be available at `http://localhost:3000`

## API Documentation
Visit `http://localhost:3000` in your browser to explore the API documentation, including available functions, variables, and endpoints.

## Development
- Source code is mounted to the container, so changes will reflect immediately with hot-reload
- MongoDB data persists between container restarts using Docker volumes
- MongoDB runs with WiredTiger storage engine for better performance
