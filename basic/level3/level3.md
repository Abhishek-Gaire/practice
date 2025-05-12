# Level 3 Documentation: Frontend with HTML, CSS, and JavaScript

## Date
- **Completed On**: May 12, 2025

## Steps Performed

### 1. **Set Up Project Directory**
- Created a directory named `level3` inside `basic` to store this task.
    - Command: `mkdir level3`
    - Location: `C:\Users\Legion\Desktop\practice\basic\level3`

### 2. **Create Frontend Files**
- Created `index.html` for the webpage structure.
- Created `script.js` to handle all CRUD operations via the Fetch API.
- Used Tailwind CSS (via CDN) for styling and responsiveness.

### 3. **Implement All API Routes**
- Added functionality to interact with all API routes:
    - GET `/api/v1/products` to fetch and display all products.
    - GET `/api/v1/products/:id` to fetch a single product for editing.
    - POST `/api/v1/products` to add a new product.
    - PUT `/api/v1/products/:id` to update an existing product.
    - DELETE `/api/v1/products/:id` to delete a product.

### 4. **Test the Webpage**
- Ensured the REST API from Task 2 is running on `http://localhost:3000`.
- Opened `index.html` in a browser.
- Tested all interactions:
    - Fetched and displayed all products.
    - Added a new product using the form.
    - Edited an existing product by clicking "Edit" and updating via the form.
    - Deleted a product using the "Delete" button.
- Confirmed the webpage is styled responsively with Tailwind CSS.

## Demonstration Video
Below is a video demonstrating all API routes working on the frontend:

- [Watch the API Demo Video on GitHub](https://github.com/Abhishek-Gaire/practice/blob/a2b536e2036ea5af64acb0e81a84308660522834/basic/level3/api_demo.mp4)

## Objectives Achieved
- [x] Built a static website layout using HTML.
- [x] Fetched API data using JavaScript (Fetch API) for all routes.
- [x] Displayed fetched data dynamically on the webpage with full CRUD functionality.
- [x] Used Tailwind CSS for enhanced styling and responsiveness.


## Notes
- The webpage interacts with all API routes, providing a complete CRUD interface for managing products.