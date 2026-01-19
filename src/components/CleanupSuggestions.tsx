// src/components/CleanupSuggestions.tsx
import type { CleanupItem } from "../lib/accountInsights";
import DonutChart from "./DonutChart";

export default function CleanupSuggestions({
  items,
  total,
}: {
  items: CleanupItem[];
  total: number;
}) {
  const percent = total ? Math.min(100, Math.round((items.length / total) * 100)) : 0;

  return (
    <div className="bg-slate-900/50 border border-cyan-400/25 rounded-lg p-6 backdrop-blur-sm
                    shadow-[0_0_40px_rgba(34,211,238,0.10)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-slate-100">
          ⚠️ 지금 정리하세요
        </h3>
        <DonutChart percent={percent} label="priority" />
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="text-slate-400 text-sm">
            아직 추천할 정리 항목이 없어요. Gmail 스캔을 실행해보세요.
          </div>
        ) : (
          items.map((x) => (
            <div
              key={x.id}
              className="flex items-center justify-between p-3 rounded-md border border-cyan-400/15 bg-slate-950/40"
            >
              <div>
                <div className="font-semibold text-slate-100">{x.serviceName}</div>
                <div className="text-xs text-slate-400">{x.label}</div>
              </div>
              <div className="text-xs text-cyan-200/90 font-mono">
                {x.serviceDomain}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 text-xs text-slate-500">
        * MVP 기준: “오래된 흔적(메일 기준)”이 많은 계정을 우선 표시해요.
      </div>
    </div>
  );
}
