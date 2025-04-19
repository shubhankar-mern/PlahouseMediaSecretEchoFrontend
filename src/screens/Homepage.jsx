import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
const Homepage = () => {
  const faqs = [
    {
      question: "What is SecretEcho?",
      answer: "SecretEcho is an AI companion messaging platform that provides real-time, intelligent conversations in a secure environment."
    },
    {
      question: "Is it free to use?",
      answer: "Yes, SecretEcho offers a free tier with basic features. Premium features are available for subscribed users."
    },
    {
      question: "How secure are my conversations?",
      answer: "All conversations are end-to-end encrypted and stored securely. Your privacy is our top priority."
    },
    {
      question: "Can I delete my chat history?",
      answer: "Yes, you have full control over your chat history and can delete it at any time."
    }
  ];

  return (
    <div>
    <div className="min-h-screen bg-[url('https://picsum.photos/1920/1080')] bg-cover bg-center bg-no-repeat relative">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-90"></div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-6 text-center">
            Welcome to SecretEcho
          </h1>
          <p className="text-xl mb-8 text-center max-w-2xl">
            Your personal AI companion for meaningful conversations. Experience real-time, 
            intelligent chat in a secure and private environment.
          </p>
          
          <div className="flex gap-4 mb-12">
            <Link 
              to="/login"
              className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold 
                hover:bg-opacity-90 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-8 py-3 bg-transparent border-2 border-white text-white 
                rounded-full font-semibold hover:bg-white hover:text-purple-600 
                transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>

          <div className="w-full  mb-16 space-y-8 flex flex-col md:flex-row justify-around mt-24">
            
              <div className="bg-purple-800 bg-opacity-10 p-6 rounded-xl backdrop-blur-lg w-1/5">
                <img 
                  src="https://picsum.photos/seed/chat/300/200" 
                  alt="Real-time Chat" 
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-3">
                  💬 Real-time Chat
                </h3>
                <p className="text-white">
                  Experience fluid conversations with instant message delivery and responses.
                </p>
              </div>
            

           
              <div className="bg-purple-800 bg-opacity-10 p-6 rounded-xl backdrop-blur-lg w-1/5">
                <img 
                  src="https://picsum.photos/seed/ai/300/200" 
                  alt="Smart Responses" 
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-3">
                  🤖 Smart Responses
                </h3>
                <p className="text-white">
                  Engage with an AI companion that understands context and provides meaningful replies.
                </p>
              </div>
            

            
              <div className="bg-purple-800 bg-opacity-10 p-6 rounded-xl backdrop-blur-lg w-1/5">
                <img 
                  src="https://picsum.photos/seed/secure/300/200" 
                  alt="Secure & Private" 
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-3">
                  🔒 Secure & Private
                </h3>
                <p className="text-white">
                  Your conversations are protected with enterprise-grade security and encryption.
                </p>
              </div>
            
          </div>

          {/* FAQ Section */}
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">
              ❓ Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-purple-800 bg-opacity-10 rounded-lg p-6 backdrop-blur-lg"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-white">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    
    </div>
    <Footer />
    </div>
  );
};

export default Homepage;