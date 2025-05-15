import React, {useState} from 'react';
import {useSocket} from '../context/SocketContext';
import type {Messages, Notifications} from "../types.ts";

function getTimeDifference(timestamp:Date): string {
  const messageDate = new Date(timestamp);
  const today = new Date();

  // Normalize dates to midnight for date-only comparison
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  ).getTime();
  const messageMidnight = new Date(
    messageDate.getFullYear(),
    messageDate.getMonth(),
    messageDate.getDate()
  ).getTime();

  // Calculate the difference in days
  const diffInTime = todayMidnight - messageMidnight;
  const diffInDays = diffInTime / (1000 * 60 * 60 * 24); // Convert ms to days

  if (diffInDays === 0) {
    // Format the time if it's today
    const hours = messageDate.getHours();
    const minutes = messageDate.getMinutes().toString().padStart(2, "0"); // Ensure two-digit minutes
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format
    return `${formattedHours}:${minutes} ${ampm}`;
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays > 1) {
    return `${diffInDays} days ago`;
  } else {
    return "Future date";
  }
}

const Chat: React.FC = () => {
  const {messages, notifications, joinRoom, sendMessage, username} = useSocket();
  const [inputUsername, setInputUsername] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [recipient, setRecipient] = useState('');

  const joinChatRoom = () => {
    if (inputUsername && !username) {
      joinRoom(inputUsername);
    }
  }

  const handleSend = () => {
    if (inputMessage && recipient && username) {
      sendMessage(recipient, inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div>
      {!username && (
        <div className="mb-4">
          <input
            type="text"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            placeholder="Enter your username"
            className="p-2 border rounded-lg w-full mb-2"
          />
          <button className="text-xl font-bold mb-4 text-indigo-600 cursor-pointer" onClick={joinChatRoom}>Confirm</button>
        </div>
      )}
      {username && (
        <>
          <div className="mb-4">
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Recipient username"
              className="p-2 border rounded-lg w-full mb-2"
            />
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message"
              className="p-2 border rounded-lg w-full mb-2"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Messages</h2>
            <ul className="list-disc pl-5">
              {messages.map((msg: Messages, index: number) => (
                <li key={index} className="text-gray-700">
                  {msg.from} to {msg.to}: {msg.message} ({getTimeDifference(msg.timestamp)})
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Notifications</h2>
            <ul className="list-disc pl-5">
              {notifications.map((notification: Notifications, index: number) => (
                <li key={index} className="text-green-700">
                  {notification.from}: {notification.message} ({getTimeDifference(notification.timestamp)})
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;