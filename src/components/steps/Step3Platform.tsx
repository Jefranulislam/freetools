'use client';

import React from 'react';
import { PLATFORMS } from '@/lib/types';

interface Step3Props {
  value: string;
  onChange: (value: string) => void;
}

export default function Step3Platform({ value, onChange }: Step3Props) {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Which platform do you prefer?
        </h2>
        <p className="text-gray-500">
          Choose the platform that best fits your needs and budget
        </p>
      </div>

      <div className="space-y-4">
        {PLATFORMS.map((platform) => (
          <button
            key={platform.value}
            onClick={() => onChange(platform.value)}
            className={`relative w-full p-5 rounded-xl border-2 text-left transition-all duration-300 card-hover ${
              value === platform.value
                ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            {value === platform.value && (
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
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: platform.color }}
              >
                {platform.label.charAt(0)}
              </div>
              <div className="flex-1">
                <h3
                  className={`font-semibold text-lg ${
                    value === platform.value ? 'text-blue-700' : 'text-gray-800'
                  }`}
                >
                  {platform.label}
                </h3>
                <p className="text-sm text-gray-500">{platform.description}</p>
              </div>
              <div className="text-right">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    platform.value === 'zoho'
                      ? 'bg-green-100 text-green-700'
                      : platform.value === 'odoo'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {platform.value === 'zoho'
                    ? 'Budget-Friendly'
                    : platform.value === 'odoo'
                    ? 'Popular Choice'
                    : 'Most Flexible'}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
