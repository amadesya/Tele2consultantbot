import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { QuickActions } from './components/QuickActions';
import { Send } from 'lucide-react';
import logo from 'figma:asset/c4b25336960b49e0cc20971ee2f2d9a521d2d895.png';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: string[];
}

const FAQ_DATABASE = {
  tariffs: {
    keywords: ['тариф', 'сменить тариф', 'тарифный план', 'выгодный тариф'],
    response: 'Чтобы сменить тариф на более выгодный:\n\n1. Зайдите в личный кабинет Tele2\n2. Выберите раздел "Тарифы"\n3. Ознакомьтесь с доступными вариантами\n4. Нажмите "Подключить" на понравившемся тарифе\n\nПопулярные тарифы:\n• Мой онлайн (от 350₽/мес) - 15 ГБ\n• Мой онлайн+ (от 550₽/мес) - 30 ГБ\n• Безлимитище (от 800₽/мес) - безлимит',
    options: ['Посмотреть все тарифы', 'Как сэкономить на тарифе?']
  },
  internet: {
    keywords: ['интернет', 'гб', 'гигабайт', 'пакет интернета', 'трафик'],
    response: 'Доступные интернет-пакеты:\n\n• 5 ГБ — 200₽\n• 10 ГБ — 350₽\n• 20 ГБ — 600₽\n• 50 ГБ — 1200₽\n\nДополнительный трафик автоматически подключается при исчерпании основного пакета по 50₽ за 1 ГБ.',
    options: ['Подключить пакет 10 ГБ', 'Узнать остаток интернета']
  },
  services: {
    keywords: ['услуга', 'подключить услугу', 'кино', 'музыка', 'видео'],
    response: 'Популярные услуги Tele2:\n\n• Кино и ТВ — 199₽/мес (доступ к онлайн-кинотеатрам)\n• Музыка — 149₽/мес (безлимитная музыка без трафика)\n• Социальные сети — 99₽/мес (безлимитный доступ)\n\nДля подключения отправьте SMS с названием услуги на номер 5050 или используйте личный кабинет.',
    options: ['Подключить «Кино и ТВ»', 'Подключить «Музыка»']
  },
  payment: {
    keywords: ['оплата', 'пополнить', 'баланс', 'счет', 'как оплатить'],
    response: 'Способы оплаты:\n\n• Банковская карта (в приложении или на сайте)\n• Через банкомат или терминал\n• Автоплатеж (настройте в личном кабинете)\n• Электронные кошельки\n• Салоны связи\n\nМинимальная сумма пополнения — 10₽',
    options: ['Настроить автоплатеж', 'Проверить баланс']
  },
  number: {
    keywords: ['номер', 'сменить номер', 'красивый номер', 'выбрать номер'],
    response: 'Смена номера телефона:\n\n1. Посетите салон Tele2 с паспортом\n2. Выберите новый номер из доступных\n3. Стоимость услуги от 100₽\n\n«Красивые» номера доступны от 500₽. Старый номер будет недоступен после смены.',
    options: ['Посмотреть красивые номера', 'Найти ближайший салон']
  },
  balance: {
    keywords: ['баланс', 'остаток', 'проверить баланс', 'сколько осталось'],
    response: 'Проверить баланс:\n\n• Наберите *105# и нажмите вызов\n• Через приложение «Мой Tele2»\n• В личном кабинете на сайте\n• SMS со словом «Баланс» на номер 5050',
    options: ['Настроить уведомления о балансе']
  }
};

function findBestMatch(query: string): { response: string; options?: string[] } | null {
  const lowerQuery = query.toLowerCase();
  
  for (const category of Object.values(FAQ_DATABASE)) {
    if (category.keywords.some(keyword => lowerQuery.includes(keyword))) {
      return { response: category.response, options: category.options };
    }
  }
  
  return null;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Здравствуйте! Я виртуальный консультант Tele2. Чем могу помочь?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const match = findBestMatch(text);
      
      let botResponse: Message;
      if (match) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: match.response,
          isBot: true,
          timestamp: new Date(),
          options: match.options
        };
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          text: 'К сожалению, я не совсем понял ваш вопрос. Попробуйте переформулировать или выберите один из популярных вопросов ниже.',
          isBot: true,
          timestamp: new Date(),
          options: [
            'Как сменить тариф?',
            'Сколько стоит интернет?',
            'Как подключить услугу?',
            'Способы оплаты'
          ]
        };
      }

      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-gray-800 p-4 flex items-center gap-3">
        <img src={logo} alt="Tele2" className="h-8 object-contain brightness-0 invert" style={{ filter: 'brightness(0) invert(1)' }} />
        <div>
          <h1 className="text-white">Консультант Tele2</h1>
          <p className="text-gray-400 text-sm">Онлайн • Всегда на связи</p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            <ChatMessage 
              message={message.text} 
              isBot={message.isBot}
              timestamp={message.timestamp}
            />
            {message.options && message.isBot && (
              <div className="flex flex-wrap gap-2 mt-3 ml-12">
                {message.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(option)}
                    className="px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-full text-sm transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 2 && (
        <QuickActions onActionClick={handleQuickAction} />
      )}

      {/* Input */}
      <div className="border-t border-gray-800 p-4 bg-black">
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={() => handleSendMessage(input)}
        />
      </div>
    </div>
  );
}
