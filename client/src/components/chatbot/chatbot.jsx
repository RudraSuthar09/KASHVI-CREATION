import React, { useRef, useEffect, useState } from 'react';
import ChatbotIcon from './chatboticon';
import ChatForm from './chatform';
import ChatMessage from './chatMessage';
import { companyInfo } from './companyInfo';
import './chatBot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);  // Default to false, don't open automatically
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Format current time for the welcome message
  const formatDateTime = () => {
    const date = new Date();
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };
  
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo
    },
    {
      role: "model",
      text: `Hi ${window?.userInfo?.login || 'user' } 
      Welcome to Kashvi Creations! 👋 `
    }
  ]);
  
  const chatBodyRef = useRef();

  // Initial load animation effect (no popup opening)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 800); // Slightly faster initial load

    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (isOpen && chatBodyRef.current) {
      const scrollTimer = setTimeout(() => {
        chatBodyRef.current.scrollTo({
          top: chatBodyRef.current.scrollHeight,
          behavior: "smooth"
        });
      }, 100);

      return () => clearTimeout(scrollTimer);
    }
  }, [chatHistory, isOpen]);

  const generateBotResponse = async(history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking...."),
        { role: "model", text }
      ]);
    }

    history = history.map(({role, text}) => ({role, parts: [{text}]}));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({contents: history })
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if(!response.ok) throw new Error(data.error.message || "Something went wrong!");

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);

    } catch(error) {
      console.log(error);
      return;
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);  // Toggle visibility on button click
  };

  return (
    <div className='chatbot-container'>
      {!isOpen && (
        <button 
          className={`chat-toggle-button ${isInitialLoad ? 'initial-load' : ''}`}
          onClick={toggleChatbot}
          aria-label="Open chat"
        >
          <ChatbotIcon />
        </button>
      )}
      
      <div className={`chatbot-popup ${isOpen ? 'open' : ''} ${isInitialLoad ? 'initial-load' : ''}`}>
        <div className='chatbot-header'>
          <div className='header-info'>
            <ChatbotIcon />
            <h2 className="logo-text">Kashvi's Bot</h2>
          </div>
          <button 
            type="button" 
            className="material-symbols-rounded"
            onClick={toggleChatbot}
          >
            keyboard_arrow_down
          </button>
        </div>

        <div ref={chatBodyRef} className="chat-body">
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat}/>
          ))}
        </div>

        <div className="chat-footer">
          <ChatForm 
            chatHistory={chatHistory} 
            setChatHistory={setChatHistory} 
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
