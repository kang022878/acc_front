import { Wifi, ArrowUpCircle, ArrowDownCircle, Globe } from 'lucide-react';

export function NetworkStatus() {
  const connections = [
    { location: 'Seoul, KR', latency: '12ms', status: 'active', traffic: '2.3 GB' },
    { location: 'Tokyo, JP', latency: '28ms', status: 'active', traffic: '1.8 GB' },
    { location: 'Singapore, SG', latency: '45ms', status: 'active', traffic: '956 MB' },
    { location: 'London, UK', latency: '156ms', status: 'idle', traffic: '234 MB' },
  ];

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-400" />
          네트워크 연결
        </h2>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <ArrowUpCircle className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400">125 Mbps</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowDownCircle className="w-4 h-4 text-green-400" />
            <span className="text-slate-400">98 Mbps</span>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {connections.map((conn, index) => (
          <div
            key={index}
            className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Wifi className={`w-5 h-5 ${conn.status === 'active' ? 'text-green-400' : 'text-slate-500'}`} />
              <div>
                <div className="font-semibold">{conn.location}</div>
                <div className="text-xs text-slate-400">{conn.traffic} transferred</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-mono text-blue-400">{conn.latency}</div>
              <div className={`text-xs ${conn.status === 'active' ? 'text-green-400' : 'text-slate-500'}`}>
                {conn.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
