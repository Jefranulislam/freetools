'use client';

interface PhaseCardProps {
  phase: number;
  title: string;
  description: string;
  modules: string[];
  timeline: string;
  priority: 'high' | 'medium' | 'low';
}

export default function PhaseCard({ phase, title, description, modules, timeline, priority }: PhaseCardProps) {
  const priorityStyles = {
    high: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700', icon: '🔴' },
    medium: { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-700', icon: '🟡' },
    low: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-700', icon: '🟢' }
  };

  const style = priorityStyles[priority];

  return (
    <div className={`${style.bg} ${style.border} border-2 rounded-xl p-5 relative`}>
      <div className="absolute -top-3 left-4">
        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          Phase {phase}
        </span>
      </div>
      <div className="mt-2">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-gray-800 text-lg">{title}</h4>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${style.badge}`}>
            {priority === 'high' ? 'Must Have' : priority === 'medium' ? 'Optimization' : 'Advanced'}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {modules.map((module, index) => (
            <span key={index} className="bg-white text-gray-700 text-xs px-3 py-1.5 rounded-lg border border-gray-200">
              {module}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{timeline}</span>
        </div>
      </div>
    </div>
  );
}
