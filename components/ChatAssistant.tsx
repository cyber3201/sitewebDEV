import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { getCourseRecommendation } from '../services/geminiService';
import { Course, ChatMessage } from '../types';

interface ChatAssistantProps {
  courses: Course[];
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ courses }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Bonjour ! Je suis l'assistant virtuel de Form'Campus. Dites-moi ce que vous cherchez, et je vous aiderai à trouver la formation idéale." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await getCourseRecommendation(userMsg, courses);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Désolé, je rencontre des difficultés techniques." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 border border-gray-200 overflow-hidden animate-fade-in-up flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="bg-brand-blue p-4 flex justify-between items-center text-white">
            <div className="flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              <span className="font-semibold">Assistant Form'Campus</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-brand-orange transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 h-80">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-lg text-sm ${
                    msg.role === 'user' 
                      ? 'bg-brand-orange text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez votre question..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-brand-blue text-white p-2 rounded-full hover:bg-blue-800 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center justify-center w-14 h-14 bg-brand-orange text-white rounded-full shadow-lg hover:bg-brand-lightOrange transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange"
      >
        <MessageSquare className="w-7 h-7" />
        <span className="absolute right-14 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap mr-2 pointer-events-none">
          Besoin d'aide ?
        </span>
      </button>
    </div>
  );
};

export default ChatAssistant;