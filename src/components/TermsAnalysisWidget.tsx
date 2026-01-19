import { FileText } from 'lucide-react';

interface TermsAnalysisWidgetProps {
  onAnalyzeClick: () => void;
}

export default function TermsAnalysisWidget({ onAnalyzeClick }: TermsAnalysisWidgetProps) {
  return (
    <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-900/30 rounded-lg flex items-center justify-center">
          <FileText className="w-6 h-6 text-blue-400" />
        </div>
        <h3 className="text-xl font-bold">약관 분석</h3>
      </div>

      <p className="text-slate-400 mb-4">
        웹사이트의 개인정보 약관을 AI가 분석하여 쉽게 설명해드립니다.
      </p>

      <button
        onClick={onAnalyzeClick}
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
      >
        분석하기
      </button>
    </div>
  );
}
