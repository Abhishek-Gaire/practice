# Intermediate Level 2 Documentation: Backend with Authentication and Authorization

## Date
- **Completed On**: May 13, 2025

## Steps Performed

### 1. **Set Up Project Directory**
- Created a directory named `intermediate/level2` to store this task.
  - Command: `mkdir intermediate/level2`
  - Location: `C:\Users\Legion\Desktop\practice\intermediate\level2`


### 2. **Initialize Node.js Project**
- Initialized a new Node.js project.
  - Command: `npm init -y`
- Installed required dependencies.
  - Commands: `npm install express mongoose jsonwebtoken bcryptjs cors dotenv`
  - `npm install -D nodemon`

### 3. **Configure Environment and Database**
- Created a `.env` file with `PORT`, `JWT_SECRET`, and `MONGODB_URI`.
- Ensured MongoDB is running locally.

### 4. **Develop Backend API**
- Set up an Express server with MongoDB connection.
- Defined `User` and `Product` schemas.
- Implemented JWT authentication middleware.
- Added role-based authorization middleware for admin-only routes.
- Created API endpoints:

### API Endpoints and Example Requests

### POST `/api/v1/register` - User Registration

- Registers a new user.

**Request Example:**  
![Register Request Screenshot](./images/register_request.png) 

**Response Example:**  
![Register Response Screenshot](./images/register-response.png) 

### POST `/api/v1/login` - User Login

- Logs in a user and returns a JWT token.

**Request Example:**  
![Login Request Screenshot](./images/login-request.png) 

**Response Example:**  
![Login Response Screenshot](./images/login-response.png) 


### GET `/api/v1/products` - Get All Products (Public)

- Returns a list of products (no authentication required).

**Request Example:**  
![Get Products Request Screenshot](./images/get-products-request.png) 

**Response Example:**  
![Get Products Response Screenshot](./images/get-products-response.png) <!-- Add your image here -->

### GET `/api/v1/products/:id` - Get Product by ID (Admin Only)

- Returns details of a single product (admin authentication required).

**Request Example:**  
![Get Product by ID Request Screenshot](./images/get-product-by-id-request.png) <!-- Add your image here -->

**Response Example:**  
![Get Product by ID Response Screenshot](./images/get-product-by-id-response.png) <!-- Add your image here -->

### POST `/api/v1/products` - Create Product (Admin Only)

- Creates a new product (admin authentication required).

**Request Example:**  
![Create Product Request Screenshot](./images/create-product-request.png) 

**Response Example:**  
![Create Product Response Screenshot](./images/create-product-response.png) 

**No Token:**
![No Token Provided](./images/addProductNoToken.png)

### PUT `/api/v1/products/:id` - Update Product (Admin Only)

- Updates a product (admin authentication required).

**Request Example:**  
![Update Product Request Screenshot](./images/update-product-request.png) 

**Response Example:**  
![Update Product Response Screenshot](./images/update-product-response.png) 

**No Token:**
![No Token Provided](./images/edit-product-no-token.png)

### DELETE `/api/v1/products/:id` - Delete Product (Admin Only)

- Deletes a product (admin authentication required).

**Request Example:**  
![Delete Product Request Screenshot](./images/delete-product-request.png) 

**Response Example:**  
![Delete Product Response Screenshot](./images/delete-product-response.png)

### 5. **Test the API**
- Ran the server with `npm start`.
- Tested endpoints using Postman:
  - Registered an admin user.
  - Logged in to get a JWT token.
  - Accessed public and protected routes, verifying authorization.

## Objectives Achieved
- [x] Implemented user authentication using JWT.
- [x] Added role-based authorization to restrict access to certain routes.
- [x] Used MongoDB to store user and product data.
- [x] Secured API endpoints with middleware.

## Notes
- The API uses bcrypt for password hashing and JWT for secure authentication.
- Only admins can create, update, or delete products, while all users can view the list.
