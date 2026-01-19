// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Dashboard from "./pages/Dashboard";
import TermsAnalysis from "./pages/TermsAnalysis";
import TermsResult from "./pages/TermsResult";
import AccountManagement from "./pages/AccountManagement";
import { apiFetch, clearToken, devLogin, getToken } from "./lib/api";
import type { Account } from "./lib/types";
import { buildCategoryDonuts, buildCleanupTop2 } from "./lib/accountInsights";

type User = { name: string; email: string; profileImage: string | null };
type AccountsListResponse = { total: number; accounts: Account[] };
type ScanResponse = { success: boolean; discoveredCount: number; accounts: any[] };

export default function App() {
  // ✅ 시작은 항상 로그아웃 상태
  const [user, setUser] = useState<User | null>(null);

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(false);
  const [accountsError, setAccountsError] = useState("");

  const [scanLoading, setScanLoading] = useState(false);
  const [scanError, setScanError] = useState("");

  // ✅ 앱 시작 시 토큰 강제 삭제 (원하는 “재시작하면 로그아웃”)
  useEffect(() => {
    clearToken();
    setAccounts([]);
    setAccountsError("");
    setScanError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAccounts = async () => {
    setAccountsLoading(true);
    setAccountsError("");
    try {
      const res = await apiFetch<AccountsListResponse>("/api/accounts?status=active&sort=-createdAt");
      setAccounts(res.accounts || []);
    } catch (e: any) {
      setAccountsError(e?.message || "계정 목록 조회 실패");
      setAccounts([]);
    } finally {
      setAccountsLoading(false);
    }
  };

  // ✅ 로그인: “취소” 여부를 호출자에게 알려주기 위해 boolean 반환
  const onLogin = async (): Promise<boolean> => {
    const email = window.prompt("이메일을 입력하세요")?.trim();
    if (!email) return false; // ✅ 취소/빈값이면 false

    const name = window.prompt("이름을 입력하세요", "사용자")?.trim();
    if (!name) return false;

    await devLogin(email, name); // acc_token 저장됨
    setUser({ name, email, profileImage: null });

    await fetchAccounts();
    return true;
  };

  const onLogout = () => {
    clearToken();
    setUser(null);
    setAccounts([]);
    setScanError("");
    setAccountsError("");
  };

  const runScan = async () => {
    setScanLoading(true);
    setScanError("");
    try {
      await apiFetch<ScanResponse>("/api/gmail/scan", { method: "POST" });
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
                onLogout={onLogout}
                onLogin={onLogin} // ✅ boolean 반환
              />
            }
          />
          <Route path="/terms-analysis" element={<TermsAnalysis />} />
          <Route path="/terms-result" element={<TermsResult />} />
          <Route path="/account-management" element={<AccountManagement user={user} onLogin={onLogin} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
