// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Dashboard from "./pages/Dashboard";
import TermsAnalysis from "./pages/TermsAnalysis";
import TermsResult from "./pages/TermsResult";
import AccountManagement from "./pages/AccountManagement";
import { apiFetch, clearToken, devLogin, startGoogleLogin, getToken, setToken } from "./lib/api";
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

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const tokenFromUrl = params.get("token");

  if (tokenFromUrl) {
    // ✅ token을 URL로 받았으면 저장
    localStorage.setItem("acc_token", tokenFromUrl);

    // ✅ URL에서 token 제거
    params.delete("token");
    const next = `${window.location.pathname}${params.toString() ? "?" + params.toString() : ""}`;
    window.history.replaceState({}, "", next);
  }

  const token = getToken(); // localStorage에서 읽기
  if (!token) return;       // 토큰 없으면 그냥 비로그인

  // ✅ 토큰이 있으면 항상 유저 복구 시도
  (async () => {
    try {
      const me = await apiFetch<any>("/api/auth/me");
      setUser({ name: me.name, email: me.email, profileImage: null });
      await fetchAccounts();
    } catch (e) {
      console.error(e);
      clearToken();
      setUser(null);
      setAccounts([]);
    }
  })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const onLogin = async (): Promise<boolean> => {
  // ✅ 배포(PROD)에서는 구글 로그인으로 리다이렉트
  if (import.meta.env.PROD) {
    try {
      await startGoogleLogin();
    } catch (e) {
      console.error(e);
      return false;
    }
    return false; // 사실상 여기 도달 안 함(리다이렉트)
  }

  // ✅ 개발(DEV)에서는 기존 dev-login 유지
  const email = window.prompt("이메일을 입력하세요")?.trim();
  if (!email) return false;

  const name = window.prompt("이름을 입력하세요", "사용자")?.trim();
  if (!name) return false;

  await devLogin(email, name);
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
          <Route path="/terms-analysis" element={<TermsAnalysis user={user} onLogin={onLogin} />} />
          <Route path="/terms-result" element={<TermsResult />} />
          <Route path="/account-management" element={<AccountManagement user={user} onLogin={onLogin} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
