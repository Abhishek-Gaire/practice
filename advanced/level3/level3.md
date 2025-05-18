# GraphQL API with Express and TypeScript

## Overview
This project implements a GraphQL API using Express as the server framework and TypeScript for type safety. It includes a GraphQL endpoint with queries and mutations, additional RESTful routes, and a built-in GraphiQL interface for easy testing and exploration.

## Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Git
- TypeScript
- A code editor (e.g., VSCode)

## Installation
1. **Initialize the Project**:
   - Create a new directory and navigate into it:
     ```bash
     mkdir advanced/level3
     cd advanced/level3
     ```
   - Initialize a Node.js project:
     ```bash
     npm init -y
     ```

2. **Install Dependencies**:
   - Install required packages:
     ```bash
     npm install express graphql-http graphql
     npm install --save-dev typescript @types/express @types/node ts-node nodemon
     ```

3. **Set Up TypeScript**:
   - Create a `tsconfig.json` file:
     ```bash
     npx tsc --init
     ```
   - Create a `src` directory and add `index.ts` there.

4. **Add Scripts to `package.json`**:
   - Update `package.json` scripts:
     ```json
     "scripts": {
       "build": "tsc",
       "start": "node dist/index.js",
       "dev": "nodemon src/index.ts"
     }
     ```

## Running the Server
1. **Compile TypeScript**:
   ```bash
   npm run build
   ```
2. **Start the Server**:
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```
3. **Access the API**:
   - GraphiQL Interface: Open `http://localhost:4000/` or `http://localhost:4000/graphiql` in your browser
   - GraphQL API: `http://localhost:4000/graphql`
   - REST Endpoints:
      - Health: `GET http://localhost:4000/api/health`
      - Users: `GET http://localhost:4000/api/users`
      - Message: `POST http://localhost:4000/api/message` with `{ "message": "test" }`

## Features
- **GraphQL API**:
   - Queries:
      - `hello`: Returns a welcome message
      - `getUser(id: ID!)`: Retrieves a user by ID
      - `listUsers`: Lists all available users
      - `health`: Returns server health status
   - Mutations:
      - `setMessage(message: String)`: Sets a message and returns confirmation
      - `createUser(name: String!, email: String!)`: Creates a new user
- **Built-in GraphiQL Interface**:
   - Interactive API testing tool
   - Automatic schema documentation
   - Query autocompletion
   - Available at both root (/) and /graphiql paths
- **RESTful API**:
   - `/api/health`: Server health check
   - `/api/users`: List of users
   - `/api/message`: Receive a message

## Testing with GraphiQL
1. Open `http://localhost:4000/` in your browser
2. Try example queries:
   ```graphql
   # Basic hello world
   query {
     hello
   }
   
   # Get health status
   query {
     health {
       status
       timestamp
     }
   }
   
   # Get user by ID
   query {
     getUser(id: "1") {
       id
       name
       email
     }
   }
   
   # Create a new user
   mutation {
     createUser(name: "Charlie", email: "charlie@example.com") {
       id
       name
       email
     }
   }
   ```

## Project Structure
```
graphql-api/
├── src/              # Source files
│   └── index.ts      # Main server file
├── dist/             # Compiled JavaScript files
├── node_modules/     # Dependencies
├── package.json      # Project metadata and scripts
├── tsconfig.json     # TypeScript configuration
└── level3.md         # This file
```

## Environment Variables
- `PORT`: Server port (default: 4000)
