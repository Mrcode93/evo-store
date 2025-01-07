
import { useState, useEffect, useRef } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { VscSend } from "react-icons/vsc";
import { fetchGeminiResponse } from "../api/gemini.js";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
const SimpleChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isFirstOpen) {
      setMessages([{ text: "هلو شون اكدر اساعدك؟", from: "bot" }]);
      setIsFirstOpen(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, from: "user" },
    ]);
    setIsLoading(true);
    const geminiResponse = await fetchGeminiResponse(message);
    handleBotResponse(geminiResponse);
    setIsLoading(false);
  };

  const handleBotResponse = (response) => {
    if (response) {
      const isArabic = /[\u0600-\u06FF]/.test(response);
      const alignment = isArabic ? "rtl" : "ltr";
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, from: "bot", alignment },
      ]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, I couldn't retrieve a response.", from: "bot" },
      ]);
    }
  };

  return (
    <div>
      <ChatToggleButton isOpen={isOpen} toggleChat={toggleChat} />
      {isOpen && (
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          sendMessage={sendMessage}
          messagesEndRef={messagesEndRef}
        />
      )}
    </div>
  );
};



const ChatToggleButton = ({ isOpen, toggleChat }) => (
  <button
    onClick={toggleChat}
    className="fixed z-50 bottom-20 right-6 p-4 bg-gradient-to-l from-[#065A82] to-[#0A9396] text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none"
  >
    <FiMessageCircle size={28} />
  </button>
);

const ChatWindow = ({ messages, isLoading, sendMessage, messagesEndRef }) => (
  <div className="fixed animate-slide-up h-[70vh] flex flex-col justify-between bottom-20 right-5 w-[95%] max-w-md bg-white shadow-xl rounded-lg p-4 z-50 border border-gray-200">
    <MessageList messages={messages} isLoading={isLoading} messagesEndRef={messagesEndRef} />
    <ChatInput sendMessage={sendMessage} />
  </div>
);

const MessageList = ({ messages, isLoading, messagesEndRef }) => (
  <div className="overflow-y-auto mb-2 h-full">
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`mb-3 flex ${
          msg.from === "user" ? "justify-end" : "justify-start"
        }`}
        dir={msg.alignment === "rtl" ? "rtl" : "ltr"}
      >
        <div
          className={`inline-block p-3 rounded-lg text-sm shadow-md ${
            msg.from === "user"
              ? " bg-gradient-to-l from-[#065A82] to-[#0A9396]  text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {formatMessage(msg.text)}
        </div>
      </div>
    ))}
    {isLoading && (
      <div className="mb-3 flex justify-start">
        <LoadingDots />
      </div>
    )}
    <div ref={messagesEndRef} />
  </div>
);

const formatMessage = (text) => {
  // التعبيرات النمطية لتحديد النقاط والروابط
  const bulletRegex = /^-\s+(.*)$/gm; // النقاط التي تبدأ بـ -
  const linkRegex = /(http[s]?:\/\/[^\s]+)/g; // الروابط
  
  // تقسيم النص بناءً على الأنماط
  const parts = text.split("\n").map((line, index) => {
    // إذا كانت نقطة
    if (bulletRegex.test(line)) {
      return (
        <li key={index} className="list-disc list-inside text-gray-800">
          {line.replace(/^-+\s*/, "")}
        </li>
      );
    }
    // إذا كانت رابطًا
    if (linkRegex.test(line)) {
      const match = line.match(linkRegex);
      return (
        <Link 
          to={match[0]}
          key={index}
          className="text-blue-500 underline"
        >
          {match[0]}
        </Link>
      );
    }
    // عرض النص العادي
    return <span key={index}>{line}</span>;
  });

  // إذا كان النص يحتوي على نقاط، لفّه داخل قائمة
  const containsBullets = bulletRegex.test(text);
  return containsBullets ? <ul>{parts}</ul> : parts;
};


const LoadingDots = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="h-3 w-3 bg-gray-400 rounded-full animate-pulse"></div>
    <div className="h-3 w-3 bg-gray-400 rounded-full animate-pulse"></div>
    <div className="h-3 w-3 bg-gray-400 rounded-full animate-pulse"></div>
  </div>
);

const ChatInput = ({ sendMessage }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      sendMessage(e.target.value.trim());
      e.target.value = "";
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        className="flex-grow border bg-gray-200 border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-[#0A9396] focus:outline-none"
        placeholder="Type a message..."
        onKeyDown={handleKeyDown}
      />
      <button
        className="ml-3 p-2 bg-[#0A9396] text-white rounded-full shadow-md hover:bg-[#0A9396] transition"
        onClick={() => {
          const input = document.querySelector("input[type='text']");
          if (input && input.value.trim()) {
            sendMessage(input.value.trim());
            input.value = "";
          }
        }}
      >
        <VscSend size={24} />
      </button>
    </div>
  );
};

export default SimpleChatbot;
