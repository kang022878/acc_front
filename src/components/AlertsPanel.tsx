import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

export function AlertsPanel() {
  const alerts = [
    {
      type: 'warning',
      message: 'High memory usage detected',
      time: '2분 전',
      icon: AlertTriangle,
    },
    {
      type: 'info',
      message: 'System backup completed',
      time: '15분 전',
      icon: Info,
    },
    {
      type: 'success',
      message: 'Security patch applied',
      time: '1시간 전',
      icon: CheckCircle,
    },
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'info':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'success':
        return 'text-green-400 bg-green-500/10 border-green-500/20';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-400';
      case 'info':
        return 'text-blue-400';
      case 'success':
        return 'text-green-400';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <h2 className="text-xl font-bold mb-4">알림</h2>
      <div className="space-y-3">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;
          return (
            <div
              key={index}
              className={`rounded-lg p-3 border ${getAlertColor(alert.type)}`}
            >
              <div className="flex gap-3">
                <Icon className={`w-5 h-5 flex-shrink-0 ${getIconColor(alert.type)}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
