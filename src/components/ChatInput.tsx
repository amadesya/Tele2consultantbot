import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex gap-2 items-end">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Напишите ваш вопрос..."
        className="flex-1 bg-gray-900 border border-gray-700 rounded-full px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
      />
      <button
        onClick={onSend}
        disabled={!value.trim()}
        className="w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-800 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
      >
        <Send className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}
