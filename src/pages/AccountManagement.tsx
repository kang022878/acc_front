import { useState } from 'react';
import Header from '../components/Header';
import AccountList from '../components/AccountList';
import { Search } from 'lucide-react';

interface AccountManagementProps {
  user: {
    name: string;
    email: string;
    profileImage: string | null;
  };
}

export default function AccountManagement({ user }: AccountManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '포털사이트', '쇼핑 · 커머스', '엔터테인먼트', '게임 / 커뮤니티형 서비스'];

  const accounts = [
    { name: '네이버', category: '포털사이트', lastActive: '2024-01-15' },
    { name: '유튜브', category: '엔터테인먼트', lastActive: '2024-01-16' },
    { name: '구글', category: '포털사이트', lastActive: '2024-01-17' },
    { name: '인스타그램', category: '엔터테인먼트', lastActive: '2024-01-14' },
    { name: '페이스북', category: '엔터테인먼트', lastActive: '2023-12-20' },
    { name: 'X', category: '엔터테인먼트', lastActive: '2023-11-05' },
    { name: '나무위키', category: '게임 / 커뮤니티형 서비스', lastActive: '2024-01-10' },
    { name: '멜론', category: '엔터테인먼트', lastActive: '2023-10-12' },
    { name: '티맵', category: '포털사이트', lastActive: '2023-08-22' },
    { name: '한게임', category: '게임 / 커뮤니티형 서비스', lastActive: '2023-06-15' },
    { name: '쿠팡', category: '쇼핑 · 커머스', lastActive: '2024-01-12' },
    { name: '박스', category: '게임 / 커뮤니티형 서비스', lastActive: '2023-05-10' },
    { name: '네이버쇼핑', category: '쇼핑 · 커머스', lastActive: '2022-12-01' },
    { name: '지마켓', category: '쇼핑 · 커머스', lastActive: '2023-09-18' },
    { name: '11번가', category: '쇼핑 · 커머스', lastActive: '2023-07-22' },
    { name: 'SSG', category: '쇼핑 · 커머스', lastActive: '2023-04-11' },
    { name: '롯데온', category: '쇼핑 · 커머스', lastActive: '2023-03-05' },
    { name: '웨이브', category: '엔터테인먼트', lastActive: '2023-02-14' },
    { name: '티빙', category: '엔터테인먼트', lastActive: '2023-01-20' },
    { name: '넷플릭스', category: '엔터테인먼트', lastActive: '2024-01-15' },
    { name: '한게임', category: '게임 / 커뮤니티형 서비스', lastActive: '2022-11-30' },
  ];

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || account.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">계정 정리</h1>
          <p className="text-blue-400 text-lg">Gmail을 분석하여 모든 서비스 님의 계정이에요.</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="쿠팡"
            className="w-full bg-white text-slate-900 px-6 py-4 pr-14 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 p-2">
            <Search className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-white text-slate-900 font-medium'
                  : 'bg-slate-800 hover:bg-slate-700 border border-blue-500/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Account Count */}
        <div className="mb-6">
          <h2 className="text-xl">
            총 <span className="text-red-400 font-bold text-2xl">{filteredAccounts.length}개</span> 계정 발견됨
          </h2>
        </div>

        {/* Account List */}
        <AccountList accounts={filteredAccounts} />
      </div>
    </div>
  );
}
