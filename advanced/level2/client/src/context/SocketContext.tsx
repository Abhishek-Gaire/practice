import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import type {Messages, Notifications} from "../types.ts";

const SocketContext = createContext<any>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('receiveMessage', (message: { from: string; to: string; message: string; timestamp: Date }) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on('notification', (notification: { from: string; message: string; timestamp: Date }) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      newSocket.close()
    };
  }, []);

  const joinRoom = (username: string) => {
    setUsername(username);
    if (socket) socket.emit('join', username);
  };

  const sendMessage = (to: string, message: string) => {
    if (socket && username && to) {
      socket.emit('sendMessage', { to, message });
    }
  };

  return (
    <SocketContext.Provider value={{ socket, messages, notifications, joinRoom, sendMessage, username }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);