import React from 'react';
import { SocketProvider } from './context/SocketContext';
import Chat from './components/Chat';

const App: React.FC = () => {
  return (
    <SocketProvider>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-indigo-600">Real-Time Chat</h1>
          <Chat />
        </div>
      </div>
    </SocketProvider>
  );
};

export default App;