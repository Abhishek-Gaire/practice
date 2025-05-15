import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'] },
});

// Store connected users and their rooms
const users: { [key: string]: string } = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join a user to a room based on username
  socket.on('join', (username: string) => {
    users[socket.id] = username;
    socket.join(username);
  });

  // Handle sending messages
  socket.on('sendMessage', ({ to, message }: { to: string; message: string }) => {
    const from = users[socket.id];
    if (from && to) {
      const messageData = { from, to, message, timestamp: new Date() };
      io.to(to).emit('receiveMessage', messageData);
      io.to(to).emit('notification', { from, message: `${from} sent you a message`, timestamp: new Date() });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    delete users[socket.id];
  });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT} at ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })}`);
});