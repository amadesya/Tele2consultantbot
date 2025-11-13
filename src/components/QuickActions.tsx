import { CreditCard, Smartphone, Wifi, HelpCircle, DollarSign, PhoneCall } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

const quickActions = [
  {
    icon: Smartphone,
    label: 'Сменить тариф',
    query: 'Как сменить тариф на более выгодный?'
  },
  {
    icon: Wifi,
    label: 'Интернет-пакет',
    query: 'Сколько стоит интернет-пакет на 10 ГБ?'
  },
  {
    icon: HelpCircle,
    label: 'Услуги',
    query: 'Как подключить услугу Кино?'
  },
  {
    icon: CreditCard,
    label: 'Оплата',
    query: 'Как оплатить счет?'
  },
  {
    icon: DollarSign,
    label: 'Баланс',
    query: 'Как проверить баланс?'
  },
  {
    icon: PhoneCall,
    label: 'Номер',
    query: 'Как сменить номер?'
  }
];

export function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <div className="px-4 pb-4">
      <p className="text-gray-400 text-sm mb-3">Популярные вопросы:</p>
      <div className="grid grid-cols-3 gap-2">
        {quickActions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              onClick={() => onActionClick(action.query)}
              className="flex flex-col items-center gap-2 p-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-pink-500 rounded-xl transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-pink-500" />
              </div>
              <span className="text-xs text-center text-gray-300">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
