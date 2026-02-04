'use client';

interface ScoreDisplayProps {
  score: number;
  maxScore?: number;
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ScoreDisplay({ 
  score, 
  maxScore = 100, 
  label,
  size = 'md'
}: ScoreDisplayProps) {
  const percentage = Math.round((score / maxScore) * 100);
  
  const getColor = () => {
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-blue-500';
    if (percentage >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getGradient = () => {
    if (percentage >= 80) return 'from-green-500 to-emerald-500';
    if (percentage >= 60) return 'from-blue-500 to-cyan-500';
    if (percentage >= 40) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  const sizes = {
    sm: { circle: 80, stroke: 6, text: 'text-xl' },
    md: { circle: 120, stroke: 8, text: 'text-3xl' },
    lg: { circle: 160, stroke: 10, text: 'text-4xl' }
  };

  const { circle, stroke, text } = sizes[size];
  const radius = (circle - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: circle, height: circle }}>
        <svg className="transform -rotate-90" width={circle} height={circle}>
          <circle
            cx={circle / 2}
            cy={circle / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx={circle / 2}
            cy={circle / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className={getGradient().includes('green') ? 'text-green-500' : getGradient().includes('blue') ? 'text-blue-500' : getGradient().includes('yellow') ? 'text-yellow-500' : 'text-red-500'} style={{ stopColor: 'currentColor' }} />
              <stop offset="100%" className={getGradient().includes('emerald') ? 'text-emerald-500' : getGradient().includes('cyan') ? 'text-cyan-500' : getGradient().includes('orange') ? 'text-orange-500' : 'text-rose-500'} style={{ stopColor: 'currentColor' }} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${text} font-bold ${getColor()}`}>{percentage}</span>
        </div>
      </div>
      <p className="text-gray-600 font-medium mt-2">{label}</p>
    </div>
  );
}
