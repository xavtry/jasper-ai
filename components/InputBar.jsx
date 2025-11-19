
// InputBar.jsx
export default function InputBar({ onSend, disabled }) {
  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(e.target.value);
      e.target.value = '';
    }
  };

  return (
    <textarea
      rows="1"
      placeholder="Message JASPER..."
      className="w-full px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-400 transition"
      onKeyDown={handleKey}
      disabled={disabled}
    />
  );
}

