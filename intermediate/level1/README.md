# Intermediate Level 1 Documentation: Frontend with a JavaScript Framework (React)

## Date
- **Completed On**: May 13, 2025

## Steps Performed****

### 1. **Set Up Project Directory**
- Created a directory named `intermediate/level1` to store this task.
    - Command: `mkdir intermediate/level1`
    - Location: `C:\Users\Legion\Desktop\practice\intermediate\level1`

### 2. **Set Up React Project**
- Initialized a new React project using Vite.
    - Command: `npm create vite@latest ./ -- --template react`
- Installed dependencies.
    - Command: `npm install`
- Installed Tailwind CSS and configured it.
    - Commands: `npm install tailwindcss @tailwindcss/vite`

- Installed `axios` for API calls.
- Command: `npm install axios`

- Installed `dotenv` for Environment Variables as dev dependency
- Command `npm install dotenv --save-dev`

### 3. **Develop React Frontend**
- Created `App.jsx` as the main component to manage state and API calls.
- Created reusable components:
- `ProductForm.jsx` for adding/editing products.
- `ProductList.jsx` for displaying the product list.
- Implemented all API routes:
- GET `/api/v1/products` to fetch and display all products.
- GET `/api/v1/products/:id` to fetch a single product for editing.
- POST `/api/v1/products` to add a new product.
- PUT `/api/v1/products/:id` to update an existing product.
- DELETE `/api/v1/products/:id` to delete a product.
- Added loading states and error handling.

### 4. **Test the React App**
- Ensured the REST API from Basic Level 2 is running on `http://localhost:3000`.
- Started the React app.
- Command: `npm run dev`
- Tested all interactions at `http://localhost:5173`:
- Fetched and displayed all products.
- Added a new product using the form.
- Edited an existing product by clicking "Edit" and updating via the form.
- Deleted a product using the "Delete" button.
- Confirmed loading states and error handling work as expected.

## Objectives Achieved
- [x] Set up a project with React.
- [x] Used functional components and state management (with React hooks).
- [x] Implemented API calls and handled loading states.
- [x] Created reusable UI components (`ProductForm` and `ProductList`).

## Notes
- The React app provides a complete CRUD interface for managing products, with improved styling using Tailwind CSS.