import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ChatBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`mb-8 flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`max-w-2xl px-6 py-4 rounded-3xl ${isUser 
          ? 'bg-purple-600 text-white' 
          : 'bg-white/10 backdrop-blur-md border border-white/20 text-gray-100'
        }`}>
        <ReactMarkdown
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div">
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-black/30 px-2 py-1 rounded text-sm">{children}</code>
              );
            }
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
