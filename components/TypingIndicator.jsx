// TypingIndicator.jsx
export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-8 animate-fade-in">
      <div className="px-6 py-4 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
    </div>
  );
}
