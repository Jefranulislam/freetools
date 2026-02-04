'use client';

interface QuestionCardProps {
  question: string;
  options: { value: string | number; label: string }[];
  selectedValue: string | number | null;
  onSelect: (value: string | number) => void;
  type?: 'radio' | 'button';
}

export default function QuestionCard({
  question,
  options,
  selectedValue,
  onSelect,
  type = 'button'
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
      <p className="text-gray-800 font-medium mb-4">{question}</p>
      <div className={`grid gap-2 ${options.length <= 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              selectedValue === option.value
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
