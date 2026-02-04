'use client';

import React from 'react';

interface OptionCardProps {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  color?: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function OptionCard({
  label,
  description,
  icon,
  color,
  selected,
  onClick,
  disabled = false,
}: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full p-4 rounded-xl border-2 text-left transition-all duration-300 card-hover ${
        selected
          ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {selected && (
        <div className="absolute top-3 right-3">
          <svg
            className="w-5 h-5 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
      <div className="flex items-start gap-3">
        {icon && (
          <span
            className="text-2xl flex-shrink-0"
            style={color ? { filter: `drop-shadow(0 0 8px ${color}40)` } : undefined}
          >
            {icon}
          </span>
        )}
        <div>
          <h3
            className={`font-semibold ${
              selected ? 'text-blue-700' : 'text-gray-800'
            }`}
            style={color && selected ? { color } : undefined}
          >
            {label}
          </h3>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
    </button>
  );
}
