'use client';

import React from 'react';
import { DEPLOYMENTS } from '@/lib/types';

interface Step8Props {
  value: string;
  onChange: (value: string) => void;
}

export default function Step8Deployment({ value, onChange }: Step8Props) {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          How do you want to deploy the system?
        </h2>
        <p className="text-gray-500">
          Choose between cloud hosting or your own servers
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DEPLOYMENTS.map((deployment) => (
          <button
            key={deployment.value}
            onClick={() => onChange(deployment.value)}
            className={`relative p-6 rounded-xl border-2 text-center transition-all duration-300 card-hover ${
              value === deployment.value
                ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            {value === deployment.value && (
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
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-3">{deployment.icon}</span>
              <h3
                className={`font-bold text-xl ${
                  value === deployment.value ? 'text-blue-700' : 'text-gray-800'
                }`}
              >
                {deployment.label}
              </h3>
              <p className="text-sm text-gray-500 mt-2">{deployment.description}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
        <div className="flex gap-3">
          <svg
            className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-sm text-yellow-800">
            <strong>Pro tip:</strong> Cloud deployment is recommended for most businesses as it
            reduces infrastructure costs and maintenance overhead.
          </div>
        </div>
      </div>
    </div>
  );
}
