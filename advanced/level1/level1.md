# Advanced Level 3 Documentation: Task 1 - Build a Full-Stack Application (MERN)

## Date
- **Completed On**: May 15, 2025, 07:11 PM +0545

## Steps Performed

### 1. **Set Up Server**
- Created `level1/server` directory.
- Initialized a Node.js project with TypeScript.
- Installed dependencies: `express`, `mongoose`, `cors`, `bcryptjs`, `jsonwebtoken`, `dotenv`, and type definitions.
- Configured `tsconfig.json` for TypeScript compilation.
- Set up MongoDB Atlas connection in `src/config/db.ts`.

### 2. **Set Up Frontend**
- Created `level1/client` directory.
- Initialized a Vite React project with TypeScript.
- Installed dependencies: `react`, `react-dom`, `react-router-dom`, `axios`, `tailwindcss`, and type definitions.
- Configured Tailwind CSS in `tailwind.config.js` and `index.css`.
- Implemented Context API for authentication state management in `src/context/AuthContext.tsx`.

### 3. **Develop Application**
- Built backend with Express and Mongoose for MongoDB interaction.
- Created user model (`src/models/User.ts`) with email, password, and role fields.
- Implemented JWT-based authentication with middleware (`src/middleware/auth.ts`).
- Set up API routes for registration, login (`src/routes/auth.ts`), and user data retrieval (`src/routes/user.ts`).
- Developed frontend with React and TypeScript, including navigation (`src/components/Navbar.tsx`), login page (`src/pages/Login.tsx`), and dashboard (`src/pages/Dashboard.tsx`).
- Integrated role-based access: admins can view all users, while regular users see only their profile.
- Used `axios` for API calls between frontend and backend.

### 4. **Test the Application**
- Ran the backend server on `http://localhost:5000`.
- Ran the frontend on `http://localhost:5173`.
- Tested registration, login, and role-based access with multiple users.
- Verified that admins can see all users and regular users can only view their profile.

[//]: # (## Deployment)

[//]: # (- **Frontend Deployment**:)

[//]: # (    - **Where**: Deployed to Vercel.)

[//]: # (    - **How**: Pushed the `client/` directory to a GitHub repository &#40;`https://github.com/your-username/mern-app`&#41;, connected it to Vercel, and configured environment variables &#40;`VITE_API_URL=http://mern-app-backend.onrender.com`&#41;.)

[//]: # (    - **Link**: [https://mern-app-frontend.vercel.app]&#40;https://mern-app-frontend.vercel.app&#41;)

[//]: # (- **Backend Deployment**:)

[//]: # (    - **Where**: Deployed to Render.)

[//]: # (    - **How**: Pushed the `server/` directory to the same GitHub repository, connected it to Render, set environment variables &#40;`MONGO_URI`, `JWT_SECRET`, `PORT=5000`&#41;, and configured a web service to run `npm run start`.)

[//]: # (    - **Link**: [https://mern-app-backend.onrender.com]&#40;https://mern-app-backend.onrender.com&#41;)

## Objectives Achieved
- [x] Developed a fully integrated web application.
- [x] Implemented user authentication and role-based access.

[//]: # (- [x] Deployed both frontend and backend.)
- [x] Ensured performance optimization using Context API, token caching, and minimal database queries.

## Notes
- The application uses JWT for secure authentication.
- Role-based access ensures admins and users have appropriate permissions.
- Ensure both server and client are running to test functionality locally.
- Environment variables must be configured for deployment (`MONGO_URI`, `JWT_SECRET`, `PORT`).

