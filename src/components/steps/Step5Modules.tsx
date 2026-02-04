'use client';

import React from 'react';
import CheckboxCard from '../CheckboxCard';
import { MODULES } from '@/lib/types';

interface Step5Props {
  value: string[];
  onChange: (value: string[]) => void;
  systemNeeded: string[];
}

export default function Step5Modules({ value, onChange, systemNeeded }: Step5Props) {
  const toggleModule = (moduleValue: string, checked: boolean) => {
    if (checked) {
      onChange([...value, moduleValue]);
    } else {
      onChange(value.filter((v) => v !== moduleValue));
    }
  };

  const availableModules = systemNeeded.flatMap((system) => {
    const systemModules = MODULES[system as keyof typeof MODULES];
    if (!systemModules) return [];
    return systemModules.map((mod) => ({
      ...mod,
      system,
    }));
  });

  const systemLabels: Record<string, string> = {
    crm: 'CRM Modules',
    erp: 'ERP Modules',
    hrm: 'HRM Modules',
    accounting: 'Accounting Modules',
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Which modules do you need?
        </h2>
        <p className="text-gray-500">
          Select the specific features you want to implement
        </p>
      </div>

      <div className="space-y-6">
        {systemNeeded.map((system) => {
          const systemModules = MODULES[system as keyof typeof MODULES];
          if (!systemModules) return null;

          return (
            <div key={system}>
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    system === 'crm'
                      ? 'bg-blue-500'
                      : system === 'erp'
                      ? 'bg-purple-500'
                      : system === 'hrm'
                      ? 'bg-green-500'
                      : 'bg-orange-500'
                  }`}
                />
                {systemLabels[system]}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {systemModules.map((mod) => (
                  <CheckboxCard
                    key={mod.value}
                    value={mod.value}
                    label={mod.label}
                    checked={value.includes(mod.value)}
                    onChange={(checked) => toggleModule(mod.value, checked)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {value.length > 0 && (
        <div className="mt-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {value.length} module{value.length > 1 ? 's' : ''} selected
          </span>
        </div>
      )}
    </div>
  );
}
