import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { ArrowLeft, Search } from 'lucide-react';

export default function TermsResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const url = location.state?.url || '쿠팡';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/terms-analysis')}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>약관 분석으로 돌아가기</span>
        </button>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">약관 분석</h1>
          <p className="text-blue-400 text-lg">약관 분석을 원하는 사이트를 알려주세요.</p>
        </div>

        {/* Search Display */}
        <div className="relative mb-12">
          <div className="w-full bg-white text-slate-900 px-6 py-4 pr-14 rounded-lg text-lg font-medium flex items-center">
            {url}
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 p-2">
            <Search className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* Summary Section */}
        <div className="mb-12 bg-slate-900/50 border border-blue-500/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">요약</h2>
          <p className="text-slate-200 leading-relaxed">
            이 서비스는 개인정보를 제3자에게 제공할 수 있으며, 해외로 이전될 가능성이 있어요.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="mb-12 bg-slate-900/30 border border-slate-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">주요 내용</h2>
          <ul className="space-y-4 text-slate-200">
            <li className="flex gap-3">
              <span className="text-blue-400 flex-shrink-0">•</span>
              <span>서비스 운영 및 광고 분석을 목적으로 외부 업체에 개인정보를 제공할 수 있음.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 flex-shrink-0">•</span>
              <span>일부 데이터는 국외 서버에서 처리될 수 있음.</span>
            </li>
          </ul>
        </div>

        {/* Easy Version Section */}
        <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">알아야 할 내용</h2>
          <div className="space-y-4 text-slate-200">
            <p className="leading-relaxed">
              내 정보가 여러 회사에 공유될 수 있고, 해외에 저장·처리될 수 있어 국내 법 적용이 어려울 수 있어요.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-4">
              <p className="text-yellow-200 text-sm">
                💡 <strong>쉽게 말하면:</strong> 여러분의 개인정보가 다른 회사들에게도 전달될 수 있고, 
                외국에 있는 컴퓨터에 저장될 수도 있다는 뜻이에요. 만약 문제가 생기면 우리나라 법으로 보호받기 어려울 수 있어요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
