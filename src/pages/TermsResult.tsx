import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ArrowLeft, Search } from "lucide-react";

type EvidenceItem = { flag: string; sentences: string[]; confidence: number };
type QAItem = { question: string; answer: string };

type Analysis = {
  id: string;
  serviceName: string;
  summary: string;
  riskLevel: "low" | "medium" | "high";
  riskFlags: string[];
  evidence: EvidenceItem[];
  qaAnswers: QAItem[];
};

const FLAG_LABEL: Record<string, string> = {
  third_party_sharing: "제3자 제공",
  international_transfer: "국외 이전",
  sensitive_data: "민감정보 처리",
  long_retention: "보관기간 장기/불명확",
  marketing_consent: "광고/마케팅 동의",
  purpose_change: "목적 변경 가능",
  subcontracting: "위탁/재위탁",
};

function riskLevelUI(level: Analysis["riskLevel"]) {
  if (level === "high") return { label: "HIGH", cls: "bg-red-500/15 text-red-300 border-red-500/30" };
  if (level === "medium") return { label: "MEDIUM", cls: "bg-yellow-500/15 text-yellow-200 border-yellow-500/30" };
  return { label: "LOW", cls: "bg-green-500/15 text-green-200 border-green-500/30" };
}

export default function TermsResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const inputLabel: string = location.state?.inputLabel || location.state?.url || "입력값";
  const analysis: Analysis | undefined = location.state?.analysis;

  // 분석 결과 없이 직접 /terms-result로 들어온 경우 보호
  if (!analysis) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Header />
        <div className="container mx-auto px-6 py-10 max-w-4xl">
          <button
            onClick={() => navigate("/terms-analysis")}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>약관 분석으로 돌아가기</span>
          </button>

          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
            <div className="text-lg font-semibold mb-2">분석 결과가 없어요</div>
            <div className="text-slate-400 text-sm">약관 분석 페이지에서 먼저 분석을 실행해 주세요.</div>
          </div>
        </div>
      </div>
    );
  }

  const riskUI = riskLevelUI(analysis.riskLevel);

  // evidence를 flag별로 빠르게 찾기
  const evidenceByFlag = new Map<string, EvidenceItem>();
  for (const ev of analysis.evidence || []) evidenceByFlag.set(ev.flag, ev);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/terms-analysis")}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>약관 분석으로 돌아가기</span>
        </button>

        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">약관 분석</h1>
              <p className="text-blue-400 text-lg">근거 문장을 기반으로 위험 신호를 표시해요.</p>
            </div>

            <div className={`px-3 py-2 rounded-lg border text-xs font-mono ${riskUI.cls}`}>
              RISK: {riskUI.label}
            </div>
          </div>
        </div>

        {/* Search Display */}
        <div className="relative mb-8">
          <div className="w-full bg-white text-slate-900 px-6 py-4 pr-14 rounded-lg text-lg font-medium flex items-center">
            {analysis.serviceName || inputLabel}
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 p-2">
            <Search className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* 1) One-line summary */}
        <div className="mb-8 bg-slate-900/50 border border-blue-500/30 rounded-lg p-7">
          <h2 className="text-2xl font-bold mb-3 text-blue-400">한 줄 요약</h2>
          <p className="text-slate-200 leading-relaxed">{analysis.summary}</p>
        </div>

        {/* 2) Risk signal badges */}
        <div className="mb-8 bg-slate-900/30 border border-slate-800 rounded-lg p-7">
          <h2 className="text-2xl font-bold mb-4">위험 신호</h2>

          {(!analysis.riskFlags || analysis.riskFlags.length === 0) ? (
            <div className="text-slate-400 text-sm">뚜렷한 위험 신호를 찾지 못했어요(또는 근거가 부족해요).</div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {analysis.riskFlags.map((flag) => (
                <span
                  key={flag}
                  className="px-3 py-1 rounded-full text-xs border border-cyan-400/25 bg-slate-950/40 text-cyan-200"
                  title={flag}
                >
                  {FLAG_LABEL[flag] || flag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 3) Evidence highlight */}
        <div className="mb-10 bg-slate-900/30 border border-slate-800 rounded-lg p-7">
          <h2 className="text-2xl font-bold mb-4">근거 문장 하이라이트</h2>

          {(!analysis.riskFlags || analysis.riskFlags.length === 0) ? (
            <div className="text-slate-400 text-sm">표시할 근거가 없어요.</div>
          ) : (
            <div className="space-y-6">
              {analysis.riskFlags.map((flag) => {
                const ev = evidenceByFlag.get(flag);
                return (
                  <div key={flag} className="border border-slate-700/60 rounded-lg p-5 bg-slate-950/30">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="font-semibold text-slate-100">{FLAG_LABEL[flag] || flag}</div>
                      <div className="text-xs text-slate-400">
                        신뢰도 {ev?.confidence ?? 0}%
                      </div>
                    </div>

                    {!ev?.sentences?.length ? (
                      <div className="text-slate-400 text-sm">근거 문장을 찾지 못했어요.</div>
                    ) : (
                      <ul className="space-y-2 text-slate-200">
                        {ev.sentences.map((s, idx) => (
                          <li key={idx} className="flex gap-3">
                            <span className="text-blue-400 flex-shrink-0">•</span>
                            <span className="leading-relaxed">{s}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Easy Q&A */}
        <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-7">
          <h2 className="text-2xl font-bold mb-5">이해하기 쉬운 말로</h2>

          {(!analysis.qaAnswers || analysis.qaAnswers.length === 0) ? (
            <div className="text-slate-400 text-sm">Q&A가 없어요.</div>
          ) : (
            <div className="space-y-4">
              {analysis.qaAnswers.map((qa, idx) => (
                <div key={idx} className="bg-slate-950/40 border border-blue-500/20 rounded-lg p-4">
                  <div className="text-blue-200 font-semibold mb-2">Q. {qa.question}</div>
                  <div className="text-slate-200 leading-relaxed">{qa.answer}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* (선택) 저장된 분석 상세로 이동하고 싶으면 analysis.id로 GET /api/policy-analysis/:id 호출해서 라우팅해도 됨 */}
      </div>
    </div>
  );
}
