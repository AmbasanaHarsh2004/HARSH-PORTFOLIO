import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Trash2, HelpCircle, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "👋 Hello! I am Harsh's personal AI Assistant.\n\nAsk me anything about his B.Tech in Computer Engineering, MERN stack web development, offline-first Electron desktop apps, or his work at Amdox Technologies! How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userText = inputText.trim();
    setInputText('');

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Map history for the API payload
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          sender: m.sender,
          text: m.text
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userText,
          history: historyPayload
        })
      });

      if (!response.ok) {
        throw new Error('Failed to reach server API');
      }

      const data = await response.json();
      
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text || "I apologize, but I encountered an unexpected processing error. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error('Chat Assistant Error:', error);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: "⚠️ **Connection Error**: I could not reach the backend service. Please check that the development server is running correctly or refresh the page.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: "🧹 Conversation history cleared. Ask me anything about Harsh's skills, qualifications, or professional experience!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const samplePrompts = [
    "Tell me about Harsh's Electron apps.",
    "What is his B.Tech background?",
    "Where has he done internships?",
    "What is his experience with MERN stack?"
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-cyan-500 to-sky-600 text-slate-950 font-bold rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer border border-cyan-400/30 group"
        whileHover={{ y: -2 }}
        layoutId="chat-launcher"
      >
        <MessageSquare className="w-6 h-6 text-slate-950 group-hover:rotate-6 transition-transform duration-300" />
        <span className="text-xs font-mono tracking-wider font-extrabold uppercase pr-1 hidden sm:inline text-slate-950">Ask AI Agent</span>
      </motion.button>

      {/* Slide-out Chat Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            {/* Backdrop for click out (only active on small screens) */}
            <motion.div 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="absolute right-0 bottom-0 top-0 w-full sm:w-[450px] bg-slate-950 border-l border-slate-800 pointer-events-auto flex flex-col shadow-2xl z-50 h-full"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
            >
              {/* Header */}
              <div className="p-4 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-cyan-500 glow-pulse" />
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm font-mono uppercase tracking-wider">AI Resume Co-pilot</h3>
                    <p className="text-[10px] text-slate-400 font-mono">POWERED BY GEMINI 3.5 FLASH</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button 
                    onClick={handleClearHistory}
                    className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-900 transition-colors"
                    title="Clear history"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-slate-500 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
                    title="Close assistant"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Body Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[85%] ${
                      msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                    }`}
                  >
                    <span className="text-[9px] font-mono text-slate-500 mb-1 px-1">
                      {msg.sender === 'user' ? 'You' : 'Harsh\'s AI'} • {msg.timestamp}
                    </span>
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.sender === 'user'
                          ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex flex-col items-start max-w-[85%] mr-auto">
                    <span className="text-[9px] font-mono text-slate-500 mb-1 px-1">
                      Harsh's AI is processing...
                    </span>
                    <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 rounded-tl-none flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                      <span className="text-xs font-mono">Formulating response...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions Grid (Only shows if there are few messages) */}
              {messages.length <= 2 && (
                <div className="p-4 border-t border-slate-900 bg-slate-900/10 space-y-2">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Quick Suggestion Prompts:</span>
                  </p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {samplePrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setInputText(prompt);
                        }}
                        className="text-left text-xs px-3 py-2 bg-slate-900/60 hover:bg-cyan-950/20 border border-slate-850 hover:border-cyan-500/20 rounded-xl text-slate-300 hover:text-cyan-400 transition-all duration-300 cursor-pointer"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Form */}
              <form 
                onSubmit={handleSendMessage}
                className="p-4 border-t border-slate-800 bg-slate-950 flex gap-2 items-center"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask about Harsh's resume..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="p-2.5 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:hover:bg-cyan-500 text-slate-950 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer font-bold"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
