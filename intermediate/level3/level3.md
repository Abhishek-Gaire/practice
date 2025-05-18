# Intermediate Level 2 Documentation: Task 3 - Database Integration

## Overview

This document outlines the integration of a MySQL database using Sequelize ORM with XAMPP, performing CRUD operations on
stored data, with advanced indexing, optimization, validation, and error handling middleware.

## Date

- **Completed On**: May 13, 2025, 07:10 PM +0545

## Steps Performed

### 1. **Set Up Project Directory**

- Created new `intermediate/level3` directory.
    - Location: `C:\Users\Legion\Desktop\practice\intermediate\level3`

### 2. **Install and Configure XAMPP**

- Ensured XAMPP is running with MySQL module enabled.
- Confirmed the database `product_auth_db` exists via dBeaver.

### 3. **Initialize Node.js Project and Install Dependencies**

- Initialized a Node.js project.
    - Command: `npm init -y`
- Installed required dependencies.
    - Commands:
        - `npm install express sequelize mysql2 jsonwebtoken bcryptjs cors dotenv joi`
        - `npm install -D nodemon`

### 4. **Configure Environment Variables**
- Created `.env` with `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, and `DB_PORT`.

### 5. **Set Up Sequelize**
- Initialized Sequelize CLI.
- Command: `npx sequelize-cli init`
- Updated `config/config.json` with database credentials.

### 6. **Developed Backend API**
- Connected to MySQL using Sequelize.
- Defined `User` and `Product` models.
- Implemented CRUD operations with authentication and authorization.

### 7. **Enhanced Backend API**
- Added advanced indexing to models:
    - Unique index on `User.username`.
    - Indexes on `Product.name`, `Product.userId`, and `Product.price` for faster queries.
- Implemented relationships:
    - Added `userId` foreign key to `Product` to track the creator.
    - Defined `User` hasMany `Product` and `Product` belongsTo `User`.
- Optimized database queries:
    - Selected specific attributes to reduce data transfer.
    - Limited results in `findAll` to 100 records.
    - Configured a connection pool for efficient resource usage.
- Added Joi validation for `User` and `Product` data before saving.
- Implemented error handling middleware to centralize error management.
- Modified all controllers to use `next(error)` for error propagation.

### 8. **Test the API**
- Ran the server with `npm start`.
- Tested endpoints using Postman:
    - Registered users with validation checks.
    - Logged in to get a JWT token.
    - Performed CRUD operations on products, verifying indexing, relationships, validation, and error handling.

## Objectives Achieved

- [x] Integrated a database (MySQL) and performed CRUD operations on stored data.
- [x] Used Sequelize ORM with MySQL.
- [x] Created models and relationships between tables (User and Product).
- [x] Implemented database indexing (e.g., unique on `username`, indexes on `name`, `userId`, `price`).
- [x] Performed data validation before saving records using Joi.
- [x] Applied optimization techniques (connection pooling, query optimization, selective attributes).
- [x] Added error handling middleware with `next(error)` in controllers.

## Notes
- The API uses Sequelize with advanced indexing and optimization for performance.
- Joi ensures robust data validation, and a custom middleware handles errors consistently.
- XAMPP MySQL runs locally; ensure it’s started before running the server.
