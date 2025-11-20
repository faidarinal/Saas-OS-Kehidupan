import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Copy, RotateCcw, ThumbsUp, ThumbsDown, Bookmark, Briefcase, Lightbulb } from 'lucide-react';
import { Message, Sender } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

interface ChatAreaProps {
  initialMessage?: string;
  mode?: 'GENERAL' | 'BUSINESS';
  suggestions?: string[];
}

const ChatArea: React.FC<ChatAreaProps> = ({ 
  initialMessage, 
  mode = 'GENERAL',
  suggestions = []
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isBusiness = mode === 'BUSINESS';
  const accentColor = isBusiness ? 'amber' : 'emerald';
  
  // Helper to get Tailwind classes based on accent
  const getAccentClass = (type: 'bg' | 'text' | 'border' | 'ring', shade: number) => {
    return `${type}-${accentColor}-${shade}`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'init-1',
          text: initialMessage || "Assalamualaikum! Saya asisten 'OS Kehidupan' Anda. Siap membantu soal Umroh, Bisnis, Kesehatan, atau membuat konten visual Syar'i.",
          sender: Sender.AI,
          timestamp: new Date()
        }
      ]);
    }
  }, [initialMessage, messages.length]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: Sender.USER,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textOverride) setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    
    setIsLoading(true);

    try {
      // Prepend business context if in business mode to ensure role
      let promptToSend = userMsg.text;
      if (isBusiness) {
        promptToSend = `[Context: Business Coach & Content Strategist] ${userMsg.text}`;
      }

      const responseText = await sendMessageToGemini(promptToSend);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: Sender.AI,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
        console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRegenerate = async () => {
    const lastUserMessage = [...messages].reverse().find(m => m.sender === Sender.USER);
    if (lastUserMessage) {
      handleSend(lastUserMessage.text);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const toggleSaveMessage = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isSaved: !m.isSaved } : m));
  };

  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
            <div key={i} className="min-h-[1.2rem] mb-1">
                {parts.map((part, j) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
                    }
                    return <span key={j}>{part}</span>;
                })}
            </div>
        )
    });
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header Indicator for Mode */}
      {isBusiness && (
         <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500 z-10 opacity-50"></div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-0 pb-40">
        <div className="max-w-3xl mx-auto pt-6">
          {messages.map((msg) => (
            <div key={msg.id} className="group w-full text-slate-800 border-b border-black/5 dark:border-white/5">
              <div className="flex gap-4 md:gap-6 p-4 md:py-8 m-auto">
                
                {/* Avatar Column */}
                <div className="flex flex-col relative items-end">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center overflow-hidden shadow-sm ${
                    msg.sender === Sender.USER 
                      ? 'bg-slate-200' 
                      : isBusiness ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {msg.sender === Sender.USER ? <User size={18} className="text-slate-500" /> : isBusiness ? <Briefcase size={16} /> : <Bot size={18} />}
                  </div>
                </div>

                {/* Content Column */}
                <div className="relative flex-1 overflow-hidden">
                  {/* Name */}
                  <div className="font-semibold text-sm text-slate-900 mb-1 flex items-center gap-2">
                    {msg.sender === Sender.USER ? 'Anda' : isBusiness ? 'Business Coach' : 'SaaS Islami AI'}
                  </div>

                  {/* Text Body */}
                  <div className="prose prose-slate max-w-none leading-7 text-[15px] text-slate-700">
                    {formatText(msg.text)}
                  </div>

                  {/* AI Action Bar */}
                  {msg.sender === Sender.AI && (
                    <div className="flex items-center gap-2 mt-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button 
                        onClick={() => copyToClipboard(msg.text)}
                        className="p-1.5 hover:bg-slate-100 rounded-md transition-colors hover:text-slate-600" title="Copy">
                        <Copy size={14} />
                      </button>
                      <button 
                        onClick={handleRegenerate}
                        className="p-1.5 hover:bg-slate-100 rounded-md transition-colors hover:text-slate-600" title="Regenerate">
                        <RotateCcw size={14} />
                      </button>
                      <button 
                        onClick={() => toggleSaveMessage(msg.id)}
                        className={`p-1.5 hover:bg-slate-100 rounded-md transition-colors ${msg.isSaved ? 'text-emerald-600' : 'hover:text-slate-600'}`} title="Save">
                        <Bookmark size={14} fill={msg.isSaved ? "currentColor" : "none"} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="w-full border-b border-black/5">
              <div className="flex gap-4 md:gap-6 p-4 md:py-8 m-auto">
                <div className={`flex-shrink-0 h-8 w-8 rounded-full text-white flex items-center justify-center shadow-sm ${isBusiness ? 'bg-amber-600' : 'bg-emerald-600'}`}>
                   {isBusiness ? <Briefcase size={16} /> : <Bot size={18} />}
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area (Fixed Bottom) */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white to-transparent pt-4 pb-6 px-4">
        <div className="max-w-3xl mx-auto">
          
          {/* Suggestion Chips */}
          {suggestions.length > 0 && messages.length < 3 && (
            <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar mb-1">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                    isBusiness 
                      ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' 
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  <Lightbulb size={12} />
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className={`relative flex items-end gap-2 bg-white border shadow-lg rounded-3xl px-4 py-3 transition-all ${
             isBusiness 
                ? 'border-slate-300 focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-500' 
                : 'border-slate-300 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500'
          }`}>
            <button className={`p-2 rounded-full transition-colors mb-0.5 ${isBusiness ? 'text-slate-400 hover:text-amber-600 hover:bg-amber-50' : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-100'}`}>
               <Sparkles size={20} />
            </button>
            
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isBusiness ? "Tulis topik bisnis atau konten..." : "Kirim pesan ke asisten..."}
              className="w-full max-h-[200px] py-2 bg-transparent border-0 focus:ring-0 text-slate-700 placeholder:text-slate-400 resize-none text-base"
              rows={1}
            />
            
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className={`p-2 rounded-xl mb-0.5 transition-all duration-200 ${
                input.trim() 
                    ? isBusiness ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md' : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-2 text-center text-xs text-slate-400">
            {isBusiness ? 'Mode Bisnis & Kreatif. Cek kembali fakta sebelum posting.' : 'SaaS Chat Islami dapat membuat kesalahan. Mohon cek info penting.'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;