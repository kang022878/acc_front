import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AccountInfo from '../components/AccountInfo';
import WeeklyGoals from '../components/WeeklyGoals';
import TermsAnalysisWidget from '../components/TermsAnalysisWidget';
import CleanupSuggestions from '../components/CleanupSuggestions';
import SecurityChatbot from '../components/SecurityChatbot';
import { User } from 'lucide-react';
import Rotating3DModel from '../components/Rotating3DModel';
import type { CleanupItem, CategoryDonut } from "../lib/accountInsights";
import DonutChart from '../components/DonutChart';
import IntroScreen from "../components/IntroScreen";

interface DashboardProps {
  user: {
    name: string;
    email: string;
    profileImage: string | null;
  } | null;
  accountCount: number;
  cleanupTop2: CleanupItem[];
  categoryDonuts: CategoryDonut[];
  onRunScan: () => void;
  scanLoading: boolean;
  scanError: string;
  onLogout: () => void;
  onLogin: () => Promise<boolean>;
}

export default function Dashboard({
  user,
  accountCount,
  cleanupTop2,
  categoryDonuts,
  onRunScan,
  scanLoading,
  scanError,
  onLogout,
  onLogin,
}: DashboardProps) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="bg-slate-950 text-slate-100">
      <IntroScreen />

      <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
        <Header />

        <div className="container mx-auto px-6 py-8 relative">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </div>

        {/* Main Layout */}
        <div className="relative">
          {/* Center - 3D Model */}
          <div className="flex items-center justify-center mb-14">
            <div className="relative w-full max-w-4xl">
              {/* BIG HUD Title */}
              <div className="mb-6 text-center">
                <div
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-full border border-cyan-400/40 bg-slate-950/60 backdrop-blur-sm
                             shadow-[0_0_55px_rgba(34,211,238,0.25)]"
                >
                  <span
                    className="font-mono tracking-[0.35em] text-cyan-200/95 neon-hud
                               text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                  >
                    Your accounts. Your control.
                  </span>
                </div>
              </div>

              {/* Rotating 3D Model */}
              <div className="relative animate-float">
                {/* Frame: 고정 높이를 가진 네모 영역 */}
                <div
                  className="relative w-full mx-auto rounded-xl border border-cyan-400/25 bg-slate-900/20 backdrop-blur-sm overflow-hidden
                             shadow-[0_0_80px_rgba(34,211,238,0.12)]"
                  style={{ height: 'clamp(640px, 74vh, 980px)' }}
                >
                  {/* 모델을 프레임 정중앙에 고정 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-full h-full"
                      style={{
                        transform: 'scale(1.25)',
                        transformOrigin: 'center center',
                        filter: 'drop-shadow(0 0 140px rgba(59, 130, 246, 0.78)) brightness(1.14)',
                      }}
                    >
                      <Rotating3DModel />
                    </div>
                  </div>

                  {/* Scanning lines effect */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                      className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-vertical"
                      style={{ boxShadow: '0 0 20px rgba(34, 211, 238, 0.8)' }}
                    />
                    <div
                      className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scan-vertical-2"
                      style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' }}
                    />
                  </div>

                  {/* Holographic grid overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-10">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
                        `,
                        backgroundSize: '30px 30px',
                      }}
                    />
                  </div>

                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400 opacity-60" />
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-400 opacity-60" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-400 opacity-60" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400 opacity-60" />
                </div>
              </div>
            </div>
          </div>

          {/* Widgets Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            {/* Left Column */}
            <div className="space-y-6">
              {/* User Info Card */}
              <div className="relative">
                <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-6 relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />

                  <div className="relative">
                    {!user ? (
                      // ✅ 로그인 안 된 상태 (사진 같은 UI)
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border-2 border-blue-500/50">
                            <User className="w-6 h-6 text-blue-400" />
                          </div>
                          <div>
                            <div className="font-bold text-lg">로그인해주세요</div>
                            <div className="text-slate-400 text-sm">ACC를 사용하려면 인증이 필요해요</div>
                          </div>
                        </div>

                        <button
                          onClick={() => { void onLogin(); }}

                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-blue-500/30 rounded text-sm transition-colors"
                        >
                          로그인
                        </button>

                      </div>
                    ) : (
                      // ✅ 로그인 된 상태
                      <>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border-2 border-blue-500/50">
                            {user.profileImage ? (
                              <img src={user.profileImage} alt={user.name} className="w-full h-full rounded-full" />
                            ) : (
                              <User className="w-6 h-6 text-blue-400" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-lg">{user.name}</div>
                          </div>
                        </div>

                        <p className="text-slate-400 text-sm mb-3">{user.email}</p>

                        <button
                          onClick={onLogout}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-blue-500/30 rounded text-sm transition-colors"
                        >
                          로그아웃
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="absolute -top-4 left-1/2 w-px h-4 bg-gradient-to-b from-blue-500/50 to-transparent" />
              </div>

              {user &&<AccountInfo accountCount={accountCount} onManageClick={() => navigate('/account-management')} />}
                <div className="bg-slate-900/50 border border-cyan-400/25 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-cyan-200 font-mono tracking-widest text-xs">SYNC</div>
                      <div className="text-slate-200 font-semibold">Gmail 신호 재탐지</div>
                      <div className="text-slate-400 text-xs">가입/영수증/인증 메일만 자동 탐지</div>
                    </div>
                    <button
                      onClick={user ? onRunScan : () => navigate("/account-management")}
                      disabled={!user || scanLoading}
                      className="px-4 py-2 rounded-md border border-cyan-400/30 bg-slate-950/50
                                hover:bg-slate-900/60 text-cyan-200 font-mono
                                shadow-[0_0_25px_rgba(34,211,238,0.15)] disabled:opacity-60"
                    >
                      {!user ? "LOGIN TO SCAN" : (scanLoading ? "SCANNING..." : "RUN SCAN")}
                    </button>
                  </div>
                  {scanError && <div className="mt-2 text-xs text-red-400">{scanError}</div>}
                </div>
              <WeeklyGoals />
            </div>

            {/* Middle Column */}
            <div className="space-y-6">
              <TermsAnalysisWidget onAnalyzeClick={() => navigate('/terms-analysis')} />
                <div className="bg-slate-900/50 border border-cyan-400/25 rounded-lg p-6 backdrop-blur-sm
                shadow-[0_0_40px_rgba(34,211,238,0.10)]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">📡 Account Signals</h3>
                    <span className="text-xs font-mono text-cyan-200/80">CLASSIFIED</span>
                  </div>

                  <div className="space-y-3">
                    {categoryDonuts.length === 0 ? (
                      <div className="text-slate-400 text-sm">아직 신호가 없어요. RUN SCAN을 실행해보세요.</div>
                    ) : (
                      categoryDonuts.map((c) => (
                        <div
                          key={c.key}
                          className="flex items-center justify-between p-3 rounded-md border border-cyan-400/15 bg-slate-950/40"
                        >
                          <div>
                            <div className="font-semibold text-slate-100">{c.label}</div>
                            <div className="text-xs text-slate-400">{c.count}개</div>
                          </div>
                          <DonutChart percent={c.percent} />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              <CleanupSuggestions items={cleanupTop2} total={accountCount} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute -top-4 left-1/2 w-px h-4 bg-gradient-to-b from-blue-500/50 to-transparent" />
                <SecurityChatbot />
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes scan-vertical {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }

        @keyframes scan-vertical-2 {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-scan-vertical {
          animation: scan-vertical 4s ease-in-out infinite;
        }

        .animate-scan-vertical-2 {
          animation: scan-vertical-2 4s ease-in-out infinite;
          animation-delay: 2s;
        }

        .neon-hud {
          text-shadow:
            0 0 10px rgba(34, 211, 238, 0.65),
            0 0 22px rgba(34, 211, 238, 0.45),
            0 0 42px rgba(34, 211, 238, 0.28),
            0 0 70px rgba(34, 211, 238, 0.18);
        }
      `}</style>
    </div>
  );
}
