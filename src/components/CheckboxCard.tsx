'use client';

import React from 'react';

interface CheckboxCardProps {
  value: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export default function CheckboxCard({
  label,
  checked,
  onChange,
  disabled = false,
}: CheckboxCardProps) {
  return (
    <label
      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
        checked
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
      />
      <span
        className={`text-sm font-medium ${
          checked ? 'text-blue-700' : 'text-gray-700'
        }`}
      >
        {label}
      </span>
    </label>
  );
}
