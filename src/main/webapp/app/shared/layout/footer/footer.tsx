import './footer.scss';
import React, { useState } from 'react';
import { FaCommentDots, FaTimes } from 'react-icons/fa';
import axios from 'axios'; // You can also use fetch if preferred

const Chatbot: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [userInput, setUserInput] = useState('');

  // Toggle Chatbot Window
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Send message to the backend
  const sendMessage = async () => {
    if (userInput.trim()) {
      const userMessage = userInput;
      setMessages([...messages, { user: userMessage, bot: '...' }]);
      setUserInput(''); // Clear input

      try {
        // Send the message to the Flask API
        const response = await axios.post('http://127.0.0.1:5000/api/chat', {
          message: userMessage,
        });

        const botResponse = response.data.message;
        // Update the chat history with the bot response
        setMessages(prevMessages =>
          prevMessages.map((msg, index) => (index === prevMessages.length - 1 ? { ...msg, bot: botResponse } : msg)),
        );
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prevMessages =>
          prevMessages.map((msg, index) =>
            index === prevMessages.length - 1 ? { ...msg, bot: 'Error: Unable to communicate with the server.' } : msg,
          ),
        );
      }
    }
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([]); // Reset messages to an empty array
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
            <div className="chat-window mb-4 max-h-60 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index}>
                  <div className="text-right text-sm text-gray-800">
                    <strong>You:</strong> {msg.user}
                  </div>
                  <div className="text-left text-sm text-blue-600">
                    <strong>Bot:</strong> {msg.bot}
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Chat Button */}
            <button className="mb-2 w-full bg-red-600 text-white py-2 rounded-lg" onClick={clearChat}>
              Clear Chat
            </button>

            {/* Input Area */}
            <textarea
              className="w-full p-2 border rounded-lg text-gray-500"
              placeholder="Type your message..."
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
            ></textarea>
            <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 p-2 text-white w-full fixed bottom-0 left-0 right-0">
    <Chatbot /> {/* Including the Chatbot here in the footer */}
    <div className="container text-center">
      <div className="flex justify-center"></div>
      <p>&copy; 2024 Alumni Management with Event Management. Godakawela, Sri Lanka</p>
    </div>
  </footer>
);

export default Footer;
