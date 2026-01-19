import { useState, useEffect } from 'react';
import { Gauge } from 'lucide-react';

export function ResourceMonitor() {
  const [resources, setResources] = useState({
    cpu: 65,
    memory: 72,
    disk: 45,
    network: 38,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setResources({
        cpu: Math.floor(Math.random() * 30) + 50,
        memory: Math.floor(Math.random() * 20) + 65,
        disk: Math.floor(Math.random() * 15) + 40,
        network: Math.floor(Math.random() * 40) + 20,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getColor = (value: number) => {
    if (value >= 80) return 'text-red-500';
    if (value >= 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getBarColor = (value: number) => {
    if (value >= 80) return 'bg-red-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const resourceData = [
    { name: 'CPU', value: resources.cpu, unit: '%' },
    { name: 'Memory', value: resources.memory, unit: '%' },
    { name: 'Disk', value: resources.disk, unit: '%' },
    { name: 'Network', value: resources.network, unit: 'Mbps' },
  ];

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Gauge className="w-5 h-5 text-blue-400" />
        리소스 사용량
      </h2>
      <div className="space-y-4">
        {resourceData.map((resource) => (
          <div key={resource.name}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{resource.name}</span>
              <span className={`text-sm font-mono font-bold ${getColor(resource.value)}`}>
                {resource.value}{resource.unit === '%' ? '%' : ` ${resource.unit}`}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${getBarColor(resource.value)} transition-all duration-500 rounded-full`}
                style={{ width: `${resource.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
