'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ToolHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  gradient?: string;
}

export default function ToolHeader({ 
  icon, 
  title, 
  subtitle,
  gradient = 'from-secondary-800 to-secondary-900'
}: ToolHeaderProps) {
  return (
    <div className={`bg-gradient-to-r ${gradient} text-white py-8 px-6`}>
      <div className="max-w-4xl mx-auto">
        {/* Logo and Back Link */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/tools" className="flex items-center gap-2 text-primary-300 hover:text-primary-200 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">All Tools</span>
          </Link>
          <Image 
            src="/fahis.png" 
            alt="FAHIS Logo" 
            width={80} 
            height={40}
            className="h-10 w-auto object-contain"
          />
        </div>
        
        {/* Title Section */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-400/20 rounded-2xl mb-4">
            {icon}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
          <p className="text-primary-300 text-sm md:text-base">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
