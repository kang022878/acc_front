// import { useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import { Search, TrendingUp, Clock } from "lucide-react";
// import { apiFetch } from "../lib/api";

// type AnalysisResponse = {
//   success: boolean;
//   analysis: {
//     id: string;
//     serviceName: string;
//     summary: string;
//     riskLevel: "low" | "medium" | "high";
//     riskFlags: string[];
//     evidence: { flag: string; sentences: string[]; confidence: number }[];
//     qaAnswers: { question: string; answer: string }[];
//   };
// };

// export default function TermsAnalysis() {
//   const navigate = useNavigate();

//   // 탭: url | text
//   const [mode, setMode] = useState<"url" | "text">("url");

//   const [url, setUrl] = useState("");
//   const [policyText, setPolicyText] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const popularKeywords = ["쿠팡", "SKT", "옥션"];

//   const popularTerms = [
//     {
//       name: "토스",
//       badge: "제3자 제공",
//       badgeColor: "bg-yellow-500/20 text-yellow-400",
//       description: "제3자 제공 가능성이 있고, 국외 이전 조항이 ...",
//     },
//     {
//       name: "어도비",
//       badge: "보관기간 불명확",
//       badgeColor: "bg-red-500/20 text-red-400",
//       description: "개인정보 보관 기간이 명확하게 정해져 있지 않아요.",
//     },
//     {
//       name: "노션",
//       badge: "마케팅 활용",
//       badgeColor: "bg-green-500/20 text-green-400",
//       description: "서비스 제공과 무관한 마케팅 광고 목적으로 ...",
//     },
//     {
//       name: "G마켓",
//       badge: "목적 변경",
//       badgeColor: "bg-purple-500/20 text-purple-400",
//       description: "개인정보 이용 목적이 추후 ...",
//     },
//   ];

//   const myAnalysisHistory = [
//     { name: "토스", description: "제3자 제공 가능성이 있고, 국외 이전 조항이 ..." },
//     { name: "어도비", description: "개인정보 보관 기간이 명확하게 정해져 있지 않아요." },
//     { name: "노션", description: "서비스 제공과 무관한 마케팅 광고 목적으로 ..." },
//   ];

//   const inputLabel = useMemo(() => {
//     if (mode === "url") return url.trim() || "";
//     return (policyText.trim().slice(0, 20) || "") + (policyText.trim().length > 20 ? "..." : "");
//   }, [mode, url, policyText]);

//   const handleAnalyze = async () => {
//     setError("");

//     // 입력 검증
//     if (mode === "url") {
//       if (!url.trim()) return;
//     } else {
//       if (!policyText.trim() || policyText.trim().length < 100) {
//         setError("약관 텍스트를 100자 이상 붙여넣어주세요.");
//         return;
//       }
//     }

//     setLoading(true);
//     try {
//       let res: AnalysisResponse;

//       if (mode === "url") {
//         // 백엔드: POST /api/policy-analysis/analyze-url
//         res = await apiFetch<AnalysisResponse>("/api/policy-analysis/analyze-url", {
//           method: "POST",
//           body: JSON.stringify({
//             url: url.trim(),
//             serviceName: url.trim(), // 서비스명 따로 받으면 여기 수정
//           }),
//         });
//       } else {
//         // 백엔드: POST /api/policy-analysis/analyze-text
//         res = await apiFetch<AnalysisResponse>("/api/policy-analysis/analyze-text", {
//           method: "POST",
//           body: JSON.stringify({
//             text: policyText.trim(),
//             serviceName: "붙여넣은 약관",
//           }),
//         });
//       }

//       if (!res?.success || !res?.analysis) {
//         throw new Error("분석 결과가 비어있어요.");
//       }

//       navigate("/terms-result", {
//         state: {
//           inputLabel: mode === "url" ? url.trim() : "텍스트 붙여넣기",
//           analysis: res.analysis,
//         },
//       });
//     } catch (e: any) {
//       // 로그인 안 했으면 401이 나올 수 있음
//       setError(e?.message || "분석에 실패했어요.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePopularClick = async (name: string) => {
//     // popular는 지금은 “name”만 있으니 URL 분석이 아니라면 백엔드가 못 가져올 수 있어.
//     // MVP에선 일단 url 칸에 넣고 analyze-url로 태우는 방식 추천.
//     setMode("url");
//     setUrl(name);
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-100">
//       <Header />

//       <div className="container mx-auto px-6 py-8 max-w-5xl">
//         {/* Title */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold mb-2">약관 분석</h1>
//           <p className="text-blue-400 text-lg">약관 분석을 원하는 사이트를 알려주세요.</p>
//         </div>

//         {/* Mode Tabs */}
//         <div className="flex gap-2 mb-4">
//           <button
//             onClick={() => setMode("url")}
//             className={`px-4 py-2 rounded-lg border transition-colors ${
//               mode === "url"
//                 ? "border-blue-500/60 bg-blue-600/20 text-blue-200"
//                 : "border-slate-700 bg-slate-900/40 text-slate-300 hover:border-blue-500/40"
//             }`}
//           >
//             URL로 분석
//           </button>
//           <button
//             onClick={() => setMode("text")}
//             className={`px-4 py-2 rounded-lg border transition-colors ${
//               mode === "text"
//                 ? "border-blue-500/60 bg-blue-600/20 text-blue-200"
//                 : "border-slate-700 bg-slate-900/40 text-slate-300 hover:border-blue-500/40"
//             }`}
//           >
//             텍스트 붙여넣기
//           </button>
//         </div>

//         {/* Input Area */}
//         {mode === "url" ? (
//           <div className="relative mb-4">
//             <input
//               type="text"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
//               placeholder="URL 입력 (또는 서비스명)"
//               className="w-full bg-white text-slate-900 px-6 py-4 pr-14 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={loading}
//             />
//             <button
//               onClick={handleAnalyze}
//               disabled={loading}
//               className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-60"
//               title="분석하기"
//             >
//               <Search className="w-6 h-6 text-blue-600" />
//             </button>
//           </div>
//         ) : (
//           <div className="mb-4">
//             <textarea
//               value={policyText}
//               onChange={(e) => setPolicyText(e.target.value)}
//               placeholder="개인정보 처리방침/약관 텍스트를 붙여넣어주세요 (100자 이상)"
//               className="w-full min-h-[220px] bg-white text-slate-900 px-5 py-4 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
//               disabled={loading}
//             />
//             <div className="flex items-center justify-between mt-2">
//               <div className="text-xs text-slate-400">{policyText.trim().length} chars</div>
//               <button
//                 onClick={handleAnalyze}
//                 disabled={loading}
//                 className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60"
//               >
//                 {loading ? "분석 중..." : "분석하기"}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Error */}
//         {error && (
//           <div className="mb-8 bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-200 text-sm">
//             {error}
//           </div>
//         )}

//         {/* Popular Keywords */}
//         <div className="mb-12">
//           <div className="flex items-center gap-3 mb-4">
//             <TrendingUp className="w-5 h-5 text-blue-400" />
//             <span className="text-slate-300">지금 뜨는 분석</span>
//           </div>
//           <div className="flex gap-3">
//             {popularKeywords.map((keyword) => (
//               <button
//                 key={keyword}
//                 onClick={() => handlePopularClick(keyword)}
//                 className="px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-blue-500/30 rounded-full transition-colors"
//               >
//                 {keyword}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Popular Terms Analysis */}
//         <div className="mb-12">
//           <h2 className="text-2xl font-bold mb-6">사람들이 많이 찾는 약관 분석</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {popularTerms.map((term) => (
//               <button
//                 key={term.name}
//                 onClick={() => handlePopularClick(term.name)}
//                 className="bg-slate-900/50 border border-slate-800 rounded-lg p-5 text-left hover:border-blue-500/50 transition-colors group"
//               >
//                 <div className="flex items-center gap-3 mb-2">
//                   <span className="font-bold text-lg">{term.name}</span>
//                   <span className={`px-3 py-1 rounded-full text-xs ${term.badgeColor}`}>
//                     {term.badge}
//                   </span>
//                 </div>
//                 <p className="text-slate-400 text-sm line-clamp-2 group-hover:text-slate-300 transition-colors">
//                   {term.description}
//                 </p>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* My Analysis History */}
//         <div>
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-3">
//               <Clock className="w-5 h-5 text-blue-400" />
//               <h2 className="text-2xl font-bold">내 약관 분석 기록</h2>
//             </div>
//             <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-blue-500/30 rounded-lg transition-colors">
//               더보기
//             </button>
//           </div>
//           <div className="space-y-3">
//             {myAnalysisHistory.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => handlePopularClick(item.name)}
//                 className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-4 text-left hover:border-blue-500/50 transition-colors"
//               >
//                 <div className="font-semibold mb-1">{item.name}</div>
//                 <p className="text-slate-400 text-sm line-clamp-1">{item.description}</p>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Search, Clock } from "lucide-react";
import { apiFetch } from "../lib/api";
import Spinner from "../components/Spinner";
import RequireLogin from "../components/RequireLogin";

interface TermsAnalysisProps {
  user: { name: string; email: string; profileImage: string | null } | null;
  onLogin: () => Promise<boolean>;
}

type HistoryItem = {
  id: string;
  serviceName: string;
  serviceUrl?: string;
  summary: string;
  riskLevel: "low" | "medium" | "high";
  riskFlags: string[];
  createdAt: string;
};

type HistoryResponse = {
  total: number;
  analyses: HistoryItem[];
};

type AnalysisDetailResponse = {
  analysis: {
    id: string;
    serviceName: string;
    serviceUrl?: string;
    summary: string;
    riskLevel: "low" | "medium" | "high";
    riskFlags: string[];
    evidence: { flag: string; sentences: string[]; confidence: number }[];
    qaAnswers: { question: string; answer: string }[];
    createdAt: string;
  };
};

export default function TermsAnalysis({ user, onLogin }: TermsAnalysisProps) {
  if (!user) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <RequireLogin
        onLogin={onLogin}
        title="약관 분석은 로그인 후 이용 가능"
        message="로그인하면 분석 기록 저장, 재조회, 결과 확인이 가능해요."
      />
    </div>
  );
}

  const navigate = useNavigate();

  // 기존 입력(너가 이미 만든 탭 버전이 있으면 그대로 두고, 아래 url만 유지해도 됨)
  const [url, setUrl] = useState("");

  // 분석 기록 상태
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

    // ✅ 새 분석(돋보기) 상태
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState("");


  // ✅ 서버에서 내 분석 기록 불러오기
  const fetchHistory = async () => {
    setHistoryLoading(true);
    setHistoryError("");
    try {
      const res = await apiFetch<HistoryResponse>("/api/policy-analysis/history");
      setHistory(res.analyses || []);
    } catch (e: any) {
      setHistoryError(e?.message || "분석 기록을 불러오지 못했어요. (로그인이 필요할 수 있어요)");
      setHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

type AnalyzeUrlResponse = {
  success: boolean;
  analysis: {
    id: string;
    serviceName: string;
    serviceUrl?: string;
    summary: string;
    riskLevel: "low" | "medium" | "high";
    riskFlags: string[];
    evidence: { flag: string; sentences: string[]; confidence: number }[];
    qaAnswers: { question: string; answer: string }[];
  };
};

  const handleAnalyze = async () => {
    if (!user) return;
    const input = url.trim();
    if (!input) return;

    setAnalysisError("");
    setAnalysisLoading(true);

    try {
      const res = await apiFetch<AnalyzeUrlResponse>("/api/policy-analysis/analyze-url", {
        method: "POST",
        body: JSON.stringify({
          url: input,
          serviceName: input,
        }),
      });

      if (!res?.success || !res?.analysis) {
        throw new Error("분석 결과가 비어있어요.");
      }

      navigate("/terms-result", {
        state: {
          inputLabel: input,
          analysis: res.analysis,
        },
      });
    } catch (e: any) {
      setAnalysisError(e?.message || "분석에 실패했어요.");
    } finally {
      setAnalysisLoading(false);
    }
  };

  // ✅ 기록 클릭 → 상세 가져와서 결과 페이지로 이동
  const openHistoryItem = async (id: string) => {
    try {
      const res = await apiFetch<AnalysisDetailResponse>(`/api/policy-analysis/${id}`);
      navigate("/terms-result", {
        state: {
          inputLabel: res.analysis.serviceName,
          analysis: res.analysis, // TermsResult가 이걸로 렌더
        },
      });
    } catch (e: any) {
  const msg = e?.message || "";
  if (msg.includes("401") || msg.toLowerCase().includes("unauthorized")) {
    setHistoryError("로그인 후 이용 가능한 기능이에요.");
  } else {
    setHistoryError("분석 기록을 불러오지 못했어요.");
  }
  setHistory([]);
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
      <div className="relative mb-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
          placeholder="URL 입력"
          className="w-full bg-white text-slate-900 px-6 py-4 pr-14 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70"
          disabled={analysisLoading}
        />

        <button
          onClick={handleAnalyze}
          disabled={analysisLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-lg transition-colors
                    disabled:opacity-60 disabled:cursor-not-allowed"
          title="분석하기"
        >
          {analysisLoading ? <Spinner size={22} /> : <Search className="w-6 h-6 text-blue-600" />}
        </button>
      </div>

      {/* ✅ 로딩 중 안내 문구 (선택) */}
      {analysisLoading && (
        <div className="mb-6 text-sm text-slate-300 flex items-center gap-2">
          <Spinner size={16} />
          <span>약관을 분석 중입니다 ... </span>
        </div>
      )}


        {/* ✅ 내 약관 분석 기록만 남김 */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-400" />
              <h2 className="text-2xl font-bold">내 약관 분석 기록</h2>
            </div>

            <button
              onClick={fetchHistory}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-blue-500/30 rounded-lg transition-colors"
            >
              새로고침
            </button>
          </div>

          {historyLoading && <div className="text-slate-400 text-sm">불러오는 중...</div>}

          {historyError && (
            <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-200 text-sm">
              {historyError}
            </div>
          )}

          {!historyLoading && !historyError && history.length === 0 && (
            <div className="text-slate-400 text-sm">
              아직 분석 기록이 없어요. 위에서 URL/텍스트로 분석을 먼저 해보세요.
            </div>
          )}

          <div className="space-y-3">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => openHistoryItem(item.id)}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-4 text-left hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold">{item.serviceName}</div>
                  <div className="text-xs text-slate-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </div>
                </div>

                <p className="text-slate-400 text-sm line-clamp-2 mt-1">{item.summary}</p>

                {/* 위험 태그 간단 배지 */}
                {item.riskFlags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.riskFlags.slice(0, 4).map((f) => (
                      <span
                        key={f}
                        className="px-2 py-1 rounded-full text-[11px] border border-cyan-400/20 bg-slate-950/40 text-cyan-200"
                        title={f}
                      >
                        {f}
                      </span>
                    ))}
                    {item.riskFlags.length > 4 && (
                      <span className="text-[11px] text-slate-400">+{item.riskFlags.length - 4}</span>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
