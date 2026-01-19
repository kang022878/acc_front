import { Users, Settings } from 'lucide-react';

interface AccountInfoProps {
  accountCount: number;
  onManageClick: () => void;
}

export default function AccountInfo({ accountCount, onManageClick }: AccountInfoProps) {
  return (
    <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-blue-400">내 계정 정보</h3>
        <Settings className="w-5 h-5 text-slate-400" />
      </div>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center border-2 border-blue-500/50">
          <Users className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <div className="text-3xl font-bold">{accountCount}개</div>
          <div className="text-slate-400">내 계정 수</div>
        </div>
      </div>

      <button
        onClick={onManageClick}
        className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
      >
        계정 관리
      </button>
    </div>
  );
}
