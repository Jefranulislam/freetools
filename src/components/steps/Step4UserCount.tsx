'use client';

import React from 'react';
import { USER_COUNTS } from '@/lib/types';

interface Step4Props {
  value: string;
  onChange: (value: string) => void;
}

export default function Step4UserCount({ value, onChange }: Step4Props) {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          How many users will use the system?
        </h2>
        <p className="text-gray-500">
          This affects licensing and infrastructure costs
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {USER_COUNTS.map((count) => (
          <button
            key={count.value}
            onClick={() => onChange(count.value)}
            className={`relative p-6 rounded-xl border-2 text-center transition-all duration-300 card-hover ${
              value === count.value
                ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            {value === count.value && (
              <div className="absolute top-2 right-2">
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
            <div className="flex flex-col items-center">
              <div
                className={`text-3xl mb-2 ${
                  value === count.value ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3
                className={`font-bold text-xl ${
                  value === count.value ? 'text-blue-700' : 'text-gray-800'
                }`}
              >
                {count.label}
              </h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
