'use client';

import { useEffect } from 'react';
import Estimator from '@/components/Estimator';
import Image from 'next/image';
import Link from 'next/link';

// Cal.com types
declare global {
  interface Window {
    Cal?: any;
  }
}

export default function EstimatorToolPage() {
  useEffect(() => {
    // Load Cal.com embed script
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const script = d.head.appendChild(d.createElement("script"));
          script.src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    // Initialize Cal
    if (window.Cal) {
      window.Cal("init", "15min", { origin: "https://app.cal.com" });
      window.Cal.ns["15min"]("ui", { 
        hideEventTypeDetails: false, 
        layout: "month_view" 
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-900 via-secondary-800 to-secondary-700 text-white py-8 px-6">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-400/20 text-primary-300 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                  clipRule="evenodd"
                />
              </svg>
              100% Free Tool
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Business System{' '}
              <span className="text-primary-400">Cost Estimator</span>
            </h1>
            <p className="text-primary-200/80 max-w-2xl mx-auto">
              Get an instant cost estimate for your CRM, ERP, HRM, or Accounting system implementation.
              Compare Odoo, Zoho, and Custom Development options.
            </p>
          </div>
        </div>
      </div>

      <div className="py-8 px-4">
        {/* Features badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { icon: '⚡', text: 'Instant Results' },
            { icon: '🎯', text: 'Accurate Estimates' },
            { icon: '🔒', text: 'No Sign-up Required' },
            { icon: '💼', text: 'Enterprise Ready' },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm border border-gray-100 text-sm text-gray-600"
            >
              <span>{feature.icon}</span>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Estimator Component */}
        <Estimator />

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-gradient-to-r from-secondary-800 to-secondary-900 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
            <p className="text-primary-300 mb-6">
              Get a detailed proposal and implementation timeline from our experts.
            </p>
            <button
              data-cal-link="itsfahis/15min"
              data-cal-namespace="15min"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
              className="inline-flex items-center gap-2 bg-primary-400 text-secondary-900 px-8 py-3 rounded-xl font-semibold hover:bg-primary-300 transition-all shadow-lg cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Free Consultation
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
