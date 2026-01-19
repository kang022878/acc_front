import { AlertTriangle } from 'lucide-react';
import DonutChart from './DonutChart';

export default function CleanupSuggestions() {
  const oldAccounts = [
    { name: '쿠팡', daysSinceActive: 314, category: '쇼핑' },
    { name: '옥션', daysSinceActive: 578, category: '쇼핑' },
  ];

  return (
    <div className="bg-slate-900/50 border border-yellow-500/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="w-6 h-6 text-yellow-400" />
        <h3 className="text-xl font-bold text-yellow-400">지금 정리하세요</h3>
      </div>

      <p className="text-slate-400 mb-6 text-sm">
        오랫동안 사용하지 않은 계정이 개인정보 유출의 위험이 될 수 있습니다.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {oldAccounts.map((account) => (
          <DonutChart
            key={account.name}
            siteName={account.name}
            daysSinceActive={account.daysSinceActive}
          />
        ))}
      </div>

      <button className="w-full mt-4 py-2 bg-yellow-600 hover:bg-yellow-500 rounded-lg font-medium transition-colors">
        계정 정리하러 가기
      </button>
    </div>
  );
}