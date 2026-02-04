'use client';

import React from 'react';
import OptionCard from '../OptionCard';
import { BUSINESS_TYPES } from '@/lib/types';

interface Step1Props {
  value: string;
  onChange: (value: string) => void;
}

export default function Step1BusinessType({ value, onChange }: Step1Props) {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          What type of business are you?
        </h2>
        <p className="text-gray-500">
          This helps us tailor the estimate to your industry needs
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {BUSINESS_TYPES.map((type) => (
          <OptionCard
            key={type.value}
            value={type.value}
            label={type.label}
            icon={type.icon}
            selected={value === type.value}
            onClick={() => onChange(type.value)}
          />
        ))}
      </div>
    </div>
  );
}
