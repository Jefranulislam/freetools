'use client';

import React from 'react';

interface Step7Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function Step7Integration({ value, onChange }: Step7Props) {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Do you need integration with existing systems?
        </h2>
        <p className="text-gray-500">
          Connecting to other software like email, payment gateways, or legacy systems
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onChange(true)}
          className={`relative p-6 rounded-xl border-2 text-center transition-all duration-300 card-hover ${
            value === true
              ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100'
              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
          }`}
        >
          {value === true && (
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
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                value === true ? 'bg-blue-100' : 'bg-gray-100'
              }`}
            >
              <svg
                className={`w-8 h-8 ${
                  value === true ? 'text-blue-600' : 'text-gray-400'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <h3
              className={`font-bold text-xl ${
                value === true ? 'text-blue-700' : 'text-gray-800'
              }`}
            >
              Yes, I need integrations
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Connect with email, payment, API, etc.
            </p>
          </div>
        </button>

        <button
          onClick={() => onChange(false)}
          className={`relative p-6 rounded-xl border-2 text-center transition-all duration-300 card-hover ${
            value === false
              ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100'
              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
          }`}
        >
          {value === false && (
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
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                value === false ? 'bg-blue-100' : 'bg-gray-100'
              }`}
            >
              <svg
                className={`w-8 h-8 ${
                  value === false ? 'text-blue-600' : 'text-gray-400'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3
              className={`font-bold text-xl ${
                value === false ? 'text-blue-700' : 'text-gray-800'
              }`}
            >
              No, standalone system
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Start fresh without integrations
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
