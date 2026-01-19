import { useState, useEffect } from 'react';
import { FileText, User, Settings, Shield } from 'lucide-react';

export function ActivityLog() {
  const initialLogs = [
    { action: 'User login', user: 'admin@system.com', time: '09:45', icon: User },
    { action: 'Config updated', user: 'system', time: '09:32', icon: Settings },
    { action: 'Security scan', user: 'auto-scan', time: '09:15', icon: Shield },
    { action: 'Report generated', user: 'scheduler', time: '09:00', icon: FileText },
  ];

  const [logs, setLogs] = useState(initialLogs);

  useEffect(() => {
    const interval = setInterval(() => {
      const actions = [
        { action: 'Database backup', user: 'auto-backup', icon: Shield },
        { action: 'User logout', user: 'admin@system.com', icon: User },
        { action: 'File uploaded', user: 'user@system.com', icon: FileText },
        { action: 'Settings changed', user: 'system', icon: Settings },
      ];
      
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      setLogs(prev => [
        { ...randomAction, time: timeStr },
        ...prev.slice(0, 4)
      ]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <h2 className="text-xl font-bold mb-4">활동 로그</h2>
      <div className="space-y-3">
        {logs.map((log, index) => {
          const Icon = log.icon;
          return (
            <div
              key={`${log.time}-${index}`}
              className="flex items-start gap-3 text-sm"
            >
              <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium">{log.action}</p>
                <p className="text-xs text-slate-400">{log.user}</p>
              </div>
              <span className="text-xs text-slate-500 font-mono">{log.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
