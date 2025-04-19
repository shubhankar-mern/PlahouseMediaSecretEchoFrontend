import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Input, Form, Button } from 'antd';
import io from 'socket.io-client';

const { TextArea } = Input;

const Dashboard = () => {
  
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  // Initialize socket connection
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Connect to WebSocket server
    const newSocket = io('http://localhost:3000');

    // Socket event listeners
    newSocket.on('connect', () => {
      console.log('Connected to socket server');
    });

    newSocket.on('message:received', (data) => {
      const { userMessage, aiResponse } = data;
      console.log(userMessage, aiResponse);
      // Add both user message and AI response
      setMessages(prev => [
        ...prev,
        {
          ...userMessage,
        },
        {
          ...aiResponse,
        }
      ]);

      setIsLoading(false);
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
      setIsLoading(false);
      // You might want to show an error message to the user
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [navigate]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  useEffect(() => {
    const fetchChat = async () => {
      const response = await fetch(`http://localhost:5000/api/get-chat/${activeChat}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        method: 'GET',  
      });
      const data = await response.json();
      console.log(data);
      setMessages([...data.conversation.messages]);
      setUser(data.conversation.user);
    }
    fetchChat();
  }, [activeChat]);
  // Handle message submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !socket) return;

    setIsLoading(true);

    try {
      // Emit message to server
      socket.emit('message:send', {
        activeChat: activeChat,
        content: message,
        sender: user, // Replace with actual user ID from your auth system
      });

      // Clear input
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    // TODO: Validate token with backend
  }, [navigate]);


  const fetchChats = async () => {
    try {
      console.log(localStorage.getItem('token'));
      const response = await fetch('http://localhost:5000/api/get-chats',{
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'GET',  
    });
    const data = await response.json();
    console.log(data);
    setChats([...data.conversations]);
    console.log(data.user,data);
    
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  useEffect(() => {
    
    fetchChats();
  }, []);

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleDeleteChat = async (chatId) => {
    const response = await fetch(`http://localhost:5000/api/delete-chat/${chatId}`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
    if(data.success){
      setChats(chats.filter(chat => chat._id !== chatId));
    }
  };
  const createChat = async () => {
    console.log(form.getFieldValue('title'),form.getFieldValue('description'));
    const title = form.getFieldValue('title');
    const description = form.getFieldValue('description');
    const response = await fetch('http://localhost:5000/api/new-chat',{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    });
    const data = await response.json();
    console.log(data);
    if(data.success){
      setChats([...chats, data.conversation]);
    }
    setIsModalOpen(false);
    setActiveChat(data.conversation._id);
    form.resetFields();
    fetchChats();
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Header */}
      <header className="bg-purple-800 bg-opacity-10 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">SecretEcho</h1>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
              className="px-4 py-2 bg-purple-800 bg-opacity-20 rounded-lg text-white 
                hover:bg-opacity-30 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 h-[calc(100vh-12rem)]">
          {/* Left Sidebar */}
          <div className="w-80 bg-purple-400 bg-opacity-10 backdrop-blur-lg rounded-xl flex flex-col">
            {/* New Chat Button */}
            <div className="p-4 border-b border-white border-opacity-20">
              <button
                onClick={showModal}
                className="w-full bg-purple-400 text-purple-600 py-3 rounded-lg font-semibold
                  hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create New Chat
              </button>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto ">
              {chats.map((chat) => (
                <div
                  key={chat._id}
                  style={{backgroundColor: activeChat === chat._id ? 'white' : 'transparent'}}
                  onClick={() => setActiveChat(chat._id)}
                  className={`p-4 border-b border-white border-opacity-10 cursor-pointer
                    hover:bg-purple-400 hover:bg-opacity-10 transition-all duration-300
                    ${activeChat === chat._id ? 'bg-purple-400 bg-opacity-20' : ''}`}
                >
                  <h3 className="text-black font-semibold mb-1 truncate">
                    {chat.name}
                  </h3>
                  <p className="text-black text-sm truncate">
                    {chat.description}
                  </p>
                      <p className="text-gray-900 text-xs mt-1">
                        created on {new Date(chat.createdAt).toLocaleDateString()}
                  </p>

                  <Button type="primary" className="text-gray-900 text-xs mt-1" onClick={() => handleDeleteChat(chat._id)}>Delete Chat</Button>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Container */}
          <div className="flex-1 bg-purple-400 bg-opacity-10 backdrop-blur-lg rounded-xl flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${msg.isAI === true ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      msg.isAI === true
                        ? 'bg-white text-purple-600'
                        : 'bg-purple-600 text-white'
                    }`}
                  > 
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.isAI === true ? 'text-purple-400' : 'text-purple-200'
                    }`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-purple-600 text-white rounded-lg p-4">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white border-opacity-20">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-white bg-opacity-20 text-black placeholder-gray-300 
                    rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  disabled={isLoading || !message.trim()}
                  className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold
                    hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* New Chat Modal */}
      <Modal
        title="Create New Chat"
        open={isModalOpen}
        onOk={() => {createChat()}}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
        className="custom-modal" // Add this for custom styling if needed
      >
        <Form
          form={form}
          layout="vertical"
          name="newChatForm"
        >
          <Form.Item
            name="title"
            label="Chat Name"
            rules={[
              {
                required: true,
                message: 'Please enter a name for your chat!',
              },
            ]}
          >
            <Input value={form.getFieldValue('title')} placeholder="Enter chat name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: 'Please enter a description!',
              },
            ]}
          >
            <TextArea
              placeholder="Enter chat description"
              rows={4}
              value={form.getFieldValue('description')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
