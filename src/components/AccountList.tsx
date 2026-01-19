interface Account {
  name: string;
  category: string;
  lastActive: string;
}

interface AccountListProps {
  accounts: Account[];
}

export default function AccountList({ accounts }: AccountListProps) {
  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const days = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (days === 0) return '오늘';
    if (days === 1) return '어제';
    if (days < 30) return `${days}일 전`;
    if (days < 365) return `${Math.floor(days / 30)}개월 전`;
    return `${Math.floor(days / 365)}년 전`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {accounts.map((account, index) => (
        <button
          key={index}
          className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 hover:border-blue-500/50 transition-colors text-left group"
        >
          <div className="font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">
            {account.name}
          </div>
          <div className="text-xs text-slate-500 mb-2">{account.category}</div>
          <div className="text-xs text-slate-400">
            마지막 활동: {getTimeSince(account.lastActive)}
          </div>
        </button>
      ))}
    </div>
  );
}
