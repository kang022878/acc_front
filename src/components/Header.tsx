import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="border-b border-blue-500/30 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
              <Shield className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold tracking-tight">ACC</h1>
              <p className="text-xs text-blue-400">Account Control Center</p>
            </div>
          </button>

          <nav className="flex gap-6">
            <button
              onClick={() => navigate('/')}
              className="text-slate-300 hover:text-white transition-colors"
            >
              대시보드
            </button>
            <button
              onClick={() => navigate('/terms-analysis')}
              className="text-slate-300 hover:text-white transition-colors"
            >
              약관 분석
            </button>
            <button
              onClick={() => navigate('/account-management')}
              className="text-slate-300 hover:text-white transition-colors"
            >
              계정 정리
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
