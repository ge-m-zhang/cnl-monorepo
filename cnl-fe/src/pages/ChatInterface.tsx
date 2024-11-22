import React, { useEffect, useState, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { chatMessagesState, userProfileState } from '../recoil/Object.recoil';
import { apiClient } from '../api/api';
import { ChatMessage } from '../types/types';
import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';

const ChatInterface: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const user = useRecoilValue(userProfileState);

  const [chatMessages, setChatMessages] = useRecoilState(chatMessagesState);

  const sendMessageMutation = useMutation({
    mutationFn: (message: string) =>
      apiClient.sendMessageToGPT(JSON.stringify({ message })),

    onSuccess: (data) => {
      
      if ( !user?.userId) return; 

      const botMessage: ChatMessage = {
        msgId: 'msg-' + uuidv4(),
        userId: user.userId, 
        sender: 'bot',
        message: data.response, 
        timestamp: new Date().toISOString(),
      };
   
      // Ensure the bot message is added correctly to the chat state
      setChatMessages((oldMessages) => [...oldMessages, botMessage]);

    },
    onError: (error) => {
      console.error('Error sending message to GPT:', error);
    },
  });

  const { mutate: sendToGPT } = sendMessageMutation;
// test ChatMessages


  const handleSendMessage = async () => {
    if (!inputValue.trim() || !user?.userId) return;

    const userMessage: ChatMessage = {
      msgId: 'msg-' + uuidv4(),
      userId: user?.userId,
      sender: 'user',
      message: inputValue,
      timestamp: new Date().toISOString(),
    };

    setChatMessages((oldMessages) => [...oldMessages, userMessage]);

    sendToGPT(inputValue);
    setInputValue('');
  };

   useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg h-full" style={{ maxHeight: '90vh' }}>
    {/* Display messages */}
    <div
      className="flex-grow overflow-y-auto bg-gray-100 rounded-t-lg p-4 space-y-4"
      style={{ maxHeight: 'calc(65vh - 72px)' }} // Adjust height based on input area height
      ref={messagesEndRef}
    >
      {chatMessages.map((msg) => (
        <div
          key={msg.msgId}
          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`${
              msg.sender === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-green-100 text-gray-700'
            } p-3 rounded-lg max-w-xs break-words`}
          >
            <ReactMarkdown>{msg.message}</ReactMarkdown> 
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  
    {/* Input field for new message */}
    <div className="w-full flex items-center bg-gray-100 p-2" style={{ height: '72px' }}>
      <input
        type="text"
        placeholder="Type a message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
          }
        }}
        className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSendMessage}
        className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  </div>
  
  );
};

export default ChatInterface;


 // fun activities in Ottawa and Montreal