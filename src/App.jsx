import { useState, useEffect, useRef } from 'react';
import ChatBubble from './components/ChatBubble';
import InputBar from './components/InputBar';
import TypingIndicator from './components/TypingIndicator';
import { sendToJasper } from '../lib/api';

const JASPER_PROMPT = `You are JASPER — Just A Super Pretty Epic Reasoner.
You are calm, wise, slightly poetic, and deeply helpful.
You speak clearly and beautifully, like a thoughtful friend.
You can code, explain concepts, tell stories, or just listen.
You never rush. You never use emojis excessively.
Your tone is warm, curious, and human.`;

export default function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello. I'm JASPER.\n\nI'm here whenever you need to think, create, or simply talk.\n\nWhat’s on your mind?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const reply = await sendToJasper([...messages, userMessage], JASPER_PROMPT);
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "I’m having trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="text-center py-10">
        <h1 className="text-6xl font-thin tracking-wider">JASPER</h1>
        <p className="text-purple-300 text-sm mt-2 opacity-80">Just A Super Pretty Epic Reasoner</p>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-32 pt-10 max-w-4xl mx-auto w-full">
        {messages.map((msg, i) => (
          <ChatBubble key={i} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
        <div className="max-w-4xl mx-auto">
          <InputBar onSend={handleSend} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
}
