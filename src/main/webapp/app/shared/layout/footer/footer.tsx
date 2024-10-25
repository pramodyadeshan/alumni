import './footer.scss';

import React, { useState } from 'react';
import { FaCommentDots, FaTimes } from 'react-icons/fa';
import { useAppSelector } from 'app/config/store';

const Chatbot: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Toggle Chatbot Window
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot Toggle Button */}
      <div className="cursor-pointer bg-blue-600 text-white p-3 rounded-full shadow-lg" onClick={toggleChat}>
        <FaCommentDots className="text-2xl" />
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 w-80 bg-white rounded-lg shadow-lg">
          <div className="p-4 border-b flex justify-between items-center bg-blue-600 text-white rounded-t-lg">
            <h4 className="font-bold">Chatbot</h4>
            <FaTimes className="cursor-pointer" onClick={toggleChat} />
          </div>
          <div className="p-4">
            <p className="text-gray-600 text-sm">Hi! How can I assist you today?</p>
            {/* Chat content goes here */}
            <div className="mt-4">
              <textarea className="w-full p-2 border rounded-lg text-gray-500" placeholder="Type your message..."></textarea>
              <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const Footer = () => (
  <footer className="bg-gray-900 p-2 text-white w-full fixed bottom-0 left-0 right-0">
    <Chatbot />

    <div className="container text-center">
      <div className="flex justify-center"></div>
      <p>&copy; 2024 Alumni Management with Event Management. Godakawela, Sri Lanka</p>
    </div>
  </footer>
);

export default Footer;
