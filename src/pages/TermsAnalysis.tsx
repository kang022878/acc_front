import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Search, TrendingUp, Clock } from 'lucide-react';

export default function TermsAnalysis() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');

  const popularKeywords = ['쿠팡', 'SKT', '옥션'];
  
  const popularTerms = [
    { 
      name: '토스', 
      badge: '제3자 제공', 
      badgeColor: 'bg-yellow-500/20 text-yellow-400',
      description: '제3자 제공 가능성이 있고, 국외 이전 조항이 ...'
    },
    { 
      name: '어도비', 
      badge: '보관기간 불명확', 
      badgeColor: 'bg-red-500/20 text-red-400',
      description: '개인정보 보관 기간이 명확하게 정해져 있지 않아요.'
    },
    { 
      name: '노션', 
      badge: '마케팅 활용', 
      badgeColor: 'bg-green-500/20 text-green-400',
      description: '서비스 제공과 무관한 마케팅 광고 목적으로 ...'
    },
    { 
      name: 'G마켓', 
      badge: '목적 변경', 
      badgeColor: 'bg-purple-500/20 text-purple-400',
      description: '개인정보 이용 목적이 추후 ...'
    },
  ];

  const myAnalysisHistory = [
    { name: '토스', description: '제3자 제공 가능성이 있고, 국외 이전 조항이 ...' },
    { name: '어도비', description: '개인정보 보관 기간이 명확하게 정해져 있지 않아요.' },
    { name: '노션', description: '서비스 제공과 무관한 마케팅 광고 목적으로 ...' },
  ];

  const handleAnalyze = () => {
    if (url.trim()) {
      navigate('/terms-result', { state: { url } });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">약관 분석</h1>
          <p className="text-blue-400 text-lg">약관 분석을 원하는 사이트를 알려주세요.</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
            placeholder="URL 입력"
            className="w-full bg-white text-slate-900 px-6 py-4 pr-14 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleAnalyze}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Search className="w-6 h-6 text-blue-600" />
          </button>
        </div>

        {/* Popular Keywords */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <span className="text-slate-300">지금 뜨는 분석</span>
          </div>
          <div className="flex gap-3">
            {popularKeywords.map((keyword) => (
              <button
                key={keyword}
                onClick={() => setUrl(keyword)}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-blue-500/30 rounded-full transition-colors"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Terms Analysis */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">사람들이 많이 찾는 약관 분석</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularTerms.map((term) => (
              <button
                key={term.name}
                onClick={() => navigate('/terms-result', { state: { url: term.name } })}
                className="bg-slate-900/50 border border-slate-800 rounded-lg p-5 text-left hover:border-blue-500/50 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-lg">{term.name}</span>
                  <span className={`px-3 py-1 rounded-full text-xs ${term.badgeColor}`}>
                    {term.badge}
                  </span>
                </div>
                <p className="text-slate-400 text-sm line-clamp-2 group-hover:text-slate-300 transition-colors">
                  {term.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* My Analysis History */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-400" />
              <h2 className="text-2xl font-bold">내 약관 분석 기록</h2>
            </div>
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-blue-500/30 rounded-lg transition-colors">
              더보기
            </button>
          </div>
          <div className="space-y-3">
            {myAnalysisHistory.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate('/terms-result', { state: { url: item.name } })}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-4 text-left hover:border-blue-500/50 transition-colors"
              >
                <div className="font-semibold mb-1">{item.name}</div>
                <p className="text-slate-400 text-sm line-clamp-1">{item.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
