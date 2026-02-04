'use client';

interface GapItemProps {
  title: string;
  score: number;
  maxScore: number;
  suggestions: string[];
}

export default function GapItem({ title, score, maxScore, suggestions }: GapItemProps) {
  const percentage = Math.round((score / maxScore) * 100);
  
  const getStatus = () => {
    if (percentage >= 80) return { color: 'bg-green-500', label: 'Strong', textColor: 'text-green-700' };
    if (percentage >= 60) return { color: 'bg-blue-500', label: 'Good', textColor: 'text-blue-700' };
    if (percentage >= 40) return { color: 'bg-yellow-500', label: 'Needs Work', textColor: 'text-yellow-700' };
    return { color: 'bg-red-500', label: 'Critical Gap', textColor: 'text-red-700' };
  };

  const status = getStatus();

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <span className={`text-sm font-medium ${status.textColor} bg-opacity-10 px-3 py-1 rounded-full ${status.color.replace('bg-', 'bg-opacity-10 bg-')}`}>
          {status.label}
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
        <div
          className={`${status.color} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        <span>Score: {score}/{maxScore}</span>
        <span>{percentage}%</span>
      </div>
      {suggestions.length > 0 && percentage < 80 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-2">Recommendations:</p>
          <ul className="space-y-1">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
