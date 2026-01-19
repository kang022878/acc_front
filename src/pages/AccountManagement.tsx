import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import AccountList from "../components/AccountList";
import { Search, RefreshCw, ShieldAlert, Link2 } from "lucide-react";
import { apiFetch } from "../lib/api";

/**
 * 백엔드 /api/gmail/scan 응답 형식
 */
type ScanAccount = {
  id: string;
  serviceName: string;
  serviceDomain: string;
  category: "signup" | "receipt" | "authentication" | string;
  firstSeenDate: string;
  confirmed: boolean;
};

type AccountsResponse = {
  total: number;
  accounts: ScanAccount[]; // AccountList가 기대하는 구조랑 동일하니까 재사용 가능
};

type ScanResponse = {
  success: boolean;
  discoveredCount: number;
  accounts: ScanAccount[];
};

type GmailStatusResponse =
  | { connected: false }
  | {
      connected: true;
      email: string;
      connectedAt?: string;
      privacyConsent?: any;
    };

interface AccountManagementProps {
  user: {
    name: string;
    email: string;
    profileImage: string | null;
  };
}

/** 카테고리 표시명 */
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

/** 도메인 후처리 */
function sanitizeDomain(domain: string) {
  return domain.replace(/[<>"]/g, "").trim();
}

export default function AccountManagement({ user }: AccountManagementProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  // Gmail 연결 상태
  const [gmailConnected, setGmailConnected] = useState<boolean | null>(null);
  const [gmailEmail, setGmailEmail] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);

  // scan 결과
  const [accounts, setAccounts] = useState<ScanAccount[]>([]);
  const [scanLoading, setScanLoading] = useState(false);
  const [scanError, setScanError] = useState("");

  const categories = ["전체", "회원가입", "결제/영수증", "인증/보안", "기타"];

  /** Gmail status 확인 */
  const checkGmailStatus = async () => {
    setStatusLoading(true);
    try {
      const res = await apiFetch<GmailStatusResponse>("/api/gmail/status");
      if ("connected" in res && res.connected) {
        setGmailConnected(true);
        setGmailEmail(res.email);
      } else {
        setGmailConnected(false);
        setGmailEmail(null);
      }
    } catch (e: any) {
      // 401이면 토큰/로그인 문제일 수도 있음
      setGmailConnected(false);
      setGmailEmail(null);
      setScanError(e?.message || "Gmail 상태 확인 실패");
    } finally {
      setStatusLoading(false);
    }
  };

  /** Gmail 연결 시작 */
  const connectGmail = async () => {
    setScanError("");
    try {
      const { authUrl } = await apiFetch<{ authUrl: string }>("/api/gmail/connect-url");
      window.location.href = authUrl;
    } catch (e: any) {
      setScanError(e?.message || "CONNECT 실패");
    }
  };

  /** RUN SCAN */
  const runScan = async () => {
    setScanLoading(true);
    setScanError("");
    try {
      await apiFetch<ScanResponse>("/api/gmail/scan", { method: "POST" });
      // ✅ 스캔 결과는 DB에 저장되므로, 저장된 목록을 다시 조회
      await fetchAccounts();
    } catch (e: any) {
      setScanError(e.message || "스캔 실패");
    } finally {
      setScanLoading(false);
    }
  };

    const fetchAccounts = async () => {
    setScanLoading(true);      // 로딩 표시 재사용
    setScanError("");
    try {
      const data = await apiFetch<AccountsResponse>("/api/accounts?status=active&sort=-createdAt");
      const cleaned = (data.accounts || []).map((a) => ({
        ...a,
        serviceDomain: sanitizeDomain(a.serviceDomain),
      }));
      setAccounts(cleaned);
    } catch (e: any) {
      setScanError(e.message || "계정 목록 조회 실패");
    } finally {
      setScanLoading(false);
    }
  };

  /** 페이지 진입 시: status 확인 */
  useEffect(() => {
    checkGmailStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Gmail 연결되어 있으면 자동 스캔(원치 않으면 삭제 가능) */
  useEffect(() => {
    if (gmailConnected) fetchAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gmailConnected]);

  /** 검색/카테고리 필터 */
  const filteredScanAccounts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return accounts.filter((acc) => {
      const name = (acc.serviceName || "").toLowerCase();
      const domain = (acc.serviceDomain || "").toLowerCase();
      const label = mapCategoryToLabel(acc.category);

      const matchesSearch = !q || name.includes(q) || domain.includes(q);
      const matchesCategory = selectedCategory === "전체" || label === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [accounts, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Title + HUD Sync Bar */}
        <div className="mb-8 flex flex-col gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">계정 정리</h1>
            <p className="text-blue-400 text-lg">Gmail을 분석하여 {user.name}님의 계정 후보를 찾아요.</p>
          </div>

          {/* HUD */}
          <div
            className="bg-slate-900/50 border border-cyan-400/25 rounded-lg p-4 backdrop-blur-sm
                       shadow-[0_0_40px_rgba(34,211,238,0.10)]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-cyan-200 font-mono tracking-widest text-xs">SYNC</div>
                <div className="text-slate-200 font-semibold">Gmail 신호 재탐지</div>
                <div className="text-slate-400 text-xs">
                  가입/영수증/인증 관련 메일만 메타데이터로 분석 (본문 저장 X)
                </div>

                <div className="mt-2 text-xs text-slate-300">
                  {statusLoading ? (
                    <span className="text-slate-400">상태 확인 중...</span>
                  ) : gmailConnected ? (
                    <span className="text-emerald-300">
                      ✅ 연결됨: <span className="font-mono">{gmailEmail}</span>
                    </span>
                  ) : (
                    <span className="text-yellow-300">⚠️ Gmail 연결이 필요해요</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={connectGmail}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-blue-400/30 bg-slate-950/50
                             hover:bg-slate-900/60 text-blue-200 font-mono
                             shadow-[0_0_25px_rgba(59,130,246,0.12)]"
                >
                  <Link2 className="w-4 h-4" />
                  CONNECT
                </button>

                <button
                  onClick={runScan}
                  disabled={scanLoading || !gmailConnected}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-cyan-400/30 bg-slate-950/50
                             hover:bg-slate-900/60 text-cyan-200 font-mono
                             shadow-[0_0_25px_rgba(34,211,238,0.15)] disabled:opacity-60"
                  title={!gmailConnected ? "먼저 Gmail을 연결하세요" : "스캔 실행"}
                >
                  <RefreshCw className={`w-4 h-4 ${scanLoading ? "animate-spin" : ""}`} />
                  {scanLoading ? "SCANNING..." : "RUN SCAN"}
                </button>
              </div>
            </div>

            {scanError && (
              <div className="mt-3 flex items-start gap-2 text-sm text-red-300">
                <ShieldAlert className="w-4 h-4 mt-0.5" />
                <div>
                  <div className="font-semibold">에러</div>
                  <div className="text-red-200/90">{scanError}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="서비스명 또는 도메인 검색 (예: coupang, github)"
            className="w-full bg-white text-slate-900 px-6 py-4 pr-14 rounded-lg text-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  ? "bg-white text-slate-900 font-medium"
                  : "bg-slate-800 hover:bg-slate-700 border border-blue-500/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Account Count */}
        <div className="mb-6">
          <h2 className="text-xl">
            총 <span className="text-red-400 font-bold text-2xl">{filteredScanAccounts.length}개</span> 계정 발견됨
          </h2>
          <div className="text-xs text-slate-400 mt-1">전체 후보: {accounts.length}개</div>
        </div>

        {/* ✅ AccountList에는 변환된 타입을 넘긴다 */}
        <AccountList accounts={filteredScanAccounts} />
      </div>
    </div>
  );
}
