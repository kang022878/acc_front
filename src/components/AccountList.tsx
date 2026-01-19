interface Account {
  id: string;
  serviceName: string;
  serviceDomain: string;
  category: string;         // signup | receipt | authentication | ...
  firstSeenDate: string;    // ISO string
  confirmed: boolean;
}

interface AccountListProps {
  accounts: Account[];
}

function mapCategoryToLabel(cat: string) {
  switch (cat) {
    case "signup":
      return "회원가입";
    case "receipt":
      return "결제/영수증";
    case "authentication":
      return "인증/보안";
    default:
      return "기타";
  }
}

export default function AccountList({ accounts }: AccountListProps) {
  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const days = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (days <= 0) return "오늘";
    if (days === 1) return "어제";
    if (days < 30) return `${days}일 전`;
    if (days < 365) return `${Math.floor(days / 30)}개월 전`;
    return `${Math.floor(days / 365)}년 전`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {accounts.map((account) => (
        <button
          key={account.id}
          className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 hover:border-blue-500/50 transition-colors text-left group"
          title={account.serviceDomain}
        >
          <div className="font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">
            {account.serviceName || account.serviceDomain}
          </div>

          <div className="text-xs text-slate-500 mb-2">
            {mapCategoryToLabel(account.category)}
          </div>

          <div className="text-xs text-slate-400">
            첫 발견: {getTimeSince(account.firstSeenDate)}
          </div>

          <div className="text-xs mt-2">
            {account.confirmed ? (
              <span className="text-green-400">확인됨</span>
            ) : (
              <span className="text-yellow-300">미확인</span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
