import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Dashboard from "./pages/Dashboard";
import TermsAnalysis from "./pages/TermsAnalysis";
import TermsResult from "./pages/TermsResult";
import AccountManagement from "./pages/AccountManagement";
import { apiFetch } from "./lib/api";
import type { Account } from "./lib/types";
import { buildCategoryDonuts, buildCleanupTop2 } from "./lib/accountInsights";

type AccountsListResponse = {
  total: number;
  accounts: Account[];
};

type ScanResponse = {
  success: boolean;
  discoveredCount: number;
  accounts: any[];
};

export default function App() {
  const [user] = useState({
    name: "서현",
    email: "kang022878@gmail.com",
    profileImage: null,
  });

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(false);
  const [accountsError, setAccountsError] = useState("");

  const [scanLoading, setScanLoading] = useState(false);
  const [scanError, setScanError] = useState("");

  // ✅ DB에 저장된 계정 목록 가져오기 (대시보드/계정관리 공통 데이터)
  const fetchAccounts = async () => {
    setAccountsLoading(true);
    setAccountsError("");
    try {
      const res = await apiFetch<AccountsListResponse>("/api/accounts?status=active&sort=-createdAt");
      setAccounts(res.accounts || []);
    } catch (e: any) {
      setAccountsError(e?.message || "계정 목록 조회 실패");
    } finally {
      setAccountsLoading(false);
    }
  };

  // ✅ 앱 시작 시 한 번 불러오기
  useEffect(() => {
    fetchAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ 대시보드 RUN SCAN 버튼용: 스캔 → 저장 → 목록 재조회
  const runScan = async () => {
    setScanLoading(true);
    setScanError("");
    try {
      await apiFetch<ScanResponse>("/api/gmail/scan", { method: "POST" });
      // 스캔 결과는 DB에 저장되므로, 저장된 목록을 다시 가져오면 됨
      await fetchAccounts();
    } catch (e: any) {
      setScanError(e?.message || "스캔 실패");
    } finally {
      setScanLoading(false);
    }
  };

  const accountCount = accounts.length;

  const cleanupTop2 = useMemo(() => buildCleanupTop2(accounts), [accounts]);
  const categoryDonuts = useMemo(() => buildCategoryDonuts(accounts), [accounts]);

  return (
    <Router>
      <div className="min-h-screen bg-slate-950">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                user={user}
                accountCount={accountCount}
                cleanupTop2={cleanupTop2}
                categoryDonuts={categoryDonuts}
                onRunScan={runScan}
                scanLoading={scanLoading || accountsLoading}
                scanError={scanError || accountsError}
              />
            }
          />

          <Route path="/terms-analysis" element={<TermsAnalysis />} />
          <Route path="/terms-result" element={<TermsResult />} />

          <Route
            path="/account-management"
            element={
              <AccountManagement
                user={user}
                // AccountManagement도 DB 저장된 목록을 보여주고 싶으면 아래 props로 넘겨서 사용 가능
                // accounts={accounts}
                // onRunScan={runScan}
                // scanLoading={scanLoading || accountsLoading}
                // scanError={scanError || accountsError}
              />
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
