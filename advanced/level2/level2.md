# Advanced Level 2 Documentation: Task 2 - WebSockets for Real-Time Communication

## Date
- **Completed On**: May 14, 2025, 10:20 PM +0545

## Steps Performed

### 1. **Set Up Server**
- Created `advanced/level2/server` directory.
- Initialized a Node.js project with TypeScript.
- Installed dependencies: `express`, `socket.io`, `typescript`, `ts-node`, and type definitions.
- Configured `tsconfig.json` for TypeScript compilation.

### 2. **Set Up Frontend**
- Created `advanced/level2/client` directory.
- Initialized a Vite React project with TypeScript.
- Installed `socket.io-client` and type definitions.
- Implemented Context API for state management.

### 3. **Develop Application**
- Set up WebSockets with Express and Socket.io on the server.
- Handled bidirectional real-time communication for messages.
- Implemented user-specific messages and notifications.
- Ensured notifications are triggered when messages are sent.
- Optimized real-time updates using room-based communication.

### 4. **Test the Application**
- Ran the server on `http://localhost:3000`.
- Ran the frontend on `http://localhost:5173`.
- Tested with multiple browser tabs, verifying real-time messaging and notifications.

## Demonstration Video
Below is a video demonstrating messages:

- [Watch the API Demo Video on GitHub](https://github.com/Abhishek-Gaire/practice/blob/5aef1288af2d2079608a3b5423994cd28da58964/advanced/level2/realTimeChat.mp4)


## Objectives Achieved
- [x] Set up WebSockets with Express and a frontend framework (React TypeScript).
- [x] Handled bidirectional real-time communication.
- [x] Implemented user-specific notifications/messages.
- [x] Optimized real-time data updates efficiently using rooms.

## Notes
- The application uses Socket.io for efficient real-time communication.
- Notifications are automatically sent when messages are received.
- Ensure both server and client are running to test functionality.