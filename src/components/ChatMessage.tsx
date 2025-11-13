import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

export function ChatMessage({ message, isBot, timestamp }: ChatMessageProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      
      <div className={`flex flex-col max-w-[75%] ${!isBot ? 'items-end' : ''}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isBot
              ? 'bg-gray-900 text-white rounded-tl-none'
              : 'bg-pink-500 text-white rounded-tr-none'
          }`}
        >
          <p className="whitespace-pre-line">{message}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1 px-1">
          {formatTime(timestamp)}
        </span>
      </div>

      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-gray-400" />
        </div>
      )}
    </div>
  );
}
