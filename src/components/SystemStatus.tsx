import { Server, Database, Cloud, Cpu } from 'lucide-react';

export function SystemStatus() {
  const systems = [
    { name: 'Web Server', status: 'online', uptime: '99.9%', icon: Server, color: 'green' },
    { name: 'Database', status: 'online', uptime: '99.8%', icon: Database, color: 'green' },
    { name: 'Cloud Storage', status: 'warning', uptime: '98.5%', icon: Cloud, color: 'yellow' },
    { name: 'Processing Unit', status: 'online', uptime: '100%', icon: Cpu, color: 'green' },
  ];

  const getStatusColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <h2 className="text-xl font-bold mb-4">시스템 상태</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {systems.map((system) => {
          const Icon = system.icon;
          return (
            <div
              key={system.name}
              className="bg-slate-800/50 rounded-lg p-4 flex items-center gap-4 border border-slate-700"
            >
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{system.name}</h3>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(system.color)} animate-pulse`} />
                </div>
                <p className="text-sm text-slate-400">Uptime: {system.uptime}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
