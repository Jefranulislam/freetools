'use client';

import React from 'react';
import { SYSTEMS } from '@/lib/types';

interface Step2Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function Step2SystemNeeded({ value, onChange }: Step2Props) {
  const toggleSystem = (systemValue: string) => {
    if (value.includes(systemValue)) {
      onChange(value.filter((v) => v !== systemValue));
    } else {
      onChange([...value, systemValue]);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          What systems do you need?
        </h2>
        <p className="text-gray-500">
          Select one or more systems you want to implement
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SYSTEMS.map((system) => (
          <button
            key={system.value}
            onClick={() => toggleSystem(system.value)}
            className={`relative w-full p-5 rounded-xl border-2 text-left transition-all duration-300 card-hover ${
              value.includes(system.value)
                ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            {value.includes(system.value) && (
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
              <span className="text-3xl">{system.icon}</span>
              <div>
                <h3
                  className={`font-semibold text-lg ${
                    value.includes(system.value) ? 'text-blue-700' : 'text-gray-800'
                  }`}
                >
                  {system.label}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{system.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {value.length > 0 && (
        <div className="mt-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {value.length} system{value.length > 1 ? 's' : ''} selected
          </span>
        </div>
      )}
    </div>
  );
}
