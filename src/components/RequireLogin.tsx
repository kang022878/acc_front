import { Lock } from "lucide-react";

interface RequireLoginProps {
  onLogin: () => Promise<boolean>;
  title?: string;
  message?: string;
}

export default function RequireLogin({
  onLogin,
  title = "로그인 후 이용 가능",
  message = "이 기능을 사용하려면 로그인이 필요해요.",
}: RequireLoginProps) {
  return (
    <div className="container mx-auto px-6 py-10 max-w-4xl">
      <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-8 text-center">
        <Lock className="w-12 h-12 mx-auto text-blue-400 mb-4" />
        <div className="text-2xl font-bold mb-2">{title}</div>
        <div className="text-slate-300 mb-6">{message}</div>

        <button
          onClick={() => void onLogin()}
          className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium"
        >
          로그인
        </button>
      </div>
    </div>
  );
}
