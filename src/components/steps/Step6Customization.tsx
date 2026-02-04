'use client';

import React from 'react';
import { CUSTOMIZATION_LEVELS } from '@/lib/types';

interface Step6Props {
  value: string;
  onChange: (value: string) => void;
}

export default function Step6Customization({ value, onChange }: Step6Props) {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          What level of customization do you need?
        </h2>
        <p className="text-gray-500">
          Higher customization increases flexibility but also costs
        </p>
      </div>

      <div className="space-y-4">
        {CUSTOMIZATION_LEVELS.map((level, index) => (
          <button
            key={level.value}
            onClick={() => onChange(level.value)}
            className={`relative w-full p-5 rounded-xl border-2 text-left transition-all duration-300 card-hover ${
              value === level.value
                ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            {value === level.value && (
              <div className="absolute top-4 right-4">
                <svg
                  className="w-6 h-6 text-blue-500"
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
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  index === 0
                    ? 'bg-green-100 text-green-600'
                    : index === 1
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3
                  className={`font-semibold text-lg ${
                    value === level.value ? 'text-blue-700' : 'text-gray-800'
                  }`}
                >
                  {level.label}
                </h3>
                <p className="text-sm text-gray-500">{level.description}</p>
              </div>
              <div className="hidden sm:block">
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i <= index + 1
                          ? index === 0
                            ? 'bg-green-500'
                            : index === 1
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
