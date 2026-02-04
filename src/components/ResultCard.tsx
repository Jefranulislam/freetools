'use client';

import React, { useEffect, useCallback } from 'react';
import { EstimateResult, FormData as EstimatorFormData } from '@/lib/types';
import { formatCurrency } from '@/lib/calculator';

// Cal.com types
declare global {
  interface Window {
    Cal?: any;
  }
}

interface ResultCardProps {
  result: EstimateResult;
  formData: EstimatorFormData;
  onGetProposal: () => void;
  onStartOver: () => void;
}

export default function ResultCard({
  result,
  formData,
  onGetProposal,
  onStartOver,
}: ResultCardProps) {
  const platformLabels: Record<string, string> = {
    odoo: 'Odoo',
    zoho: 'Zoho',
    custom: 'Custom Development',
  };

  const systemLabels: Record<string, string> = {
    crm: 'CRM',
    erp: 'ERP',
    hrm: 'HRM',
    accounting: 'Accounting',
  };

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

  // Format results for the notes field
  const formatResultsForNotes = useCallback(() => {
    let notes = `📊 Tool Used: Business System Cost Estimator\n\n`;
    notes += `📅 Generated: ${new Date().toLocaleDateString()}\n\n`;
    notes += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    notes += `📋 ESTIMATE RESULTS\n`;
    notes += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    notes += `💰 Estimated Cost: ${formatCurrency(result.estimatedCostMin)} - ${formatCurrency(result.estimatedCostMax)}\n`;
    notes += `⏱️ Timeline: ${result.timelineWeeks} weeks\n`;
    notes += `👥 Team Size: ${result.teamSize}\n\n`;
    
    notes += `📦 REQUIREMENTS:\n`;
    notes += `• Platform: ${platformLabels[formData.platform] || formData.platform}\n`;
    notes += `• Systems: ${formData.systemNeeded.map(s => systemLabels[s] || s).join(', ')}\n`;
    notes += `• Users: ${formData.userCount}\n`;
    notes += `• Modules: ${formData.modules.join(', ')}\n`;
    notes += `• Customization: ${formData.customizationLevel}\n`;
    notes += `• Integration: ${formData.integrationNeeded ? 'Yes' : 'No'}\n`;
    notes += `• Deployment: ${formData.deployment}\n\n`;
    
    notes += `💵 COST BREAKDOWN:\n`;
    notes += `• Base Cost: ${formatCurrency(result.breakdown.baseCost)}\n`;
    notes += `• User License: ${formatCurrency(result.breakdown.userCost)}\n`;
    notes += `• Modules: ${formatCurrency(result.breakdown.moduleCost)}\n`;
    notes += `• Customization: ${formatCurrency(result.breakdown.customizationCost)}\n`;
    notes += `• Integration: ${formatCurrency(result.breakdown.integrationCost)}\n`;

    return notes;
  }, [result, formData, platformLabels, systemLabels]);

  // Build Cal.com config with prefilled data
  const getCalConfig = () => {
    return JSON.stringify({
      layout: "month_view",
      useSlotsViewOnSmallScreen: "true",
      notes: formatResultsForNotes()
    });
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your Estimate is Ready!
        </h2>
        <p className="text-gray-500">
          Based on your requirements for{' '}
          <span className="font-semibold text-blue-600">
            {formData.systemNeeded.map((s) => systemLabels[s] || s).join(', ')}
          </span>{' '}
          with <span className="font-semibold text-purple-600">{platformLabels[formData.platform]}</span>
        </p>
      </div>

      {/* Main estimate card */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white mb-6 shadow-xl">
        <div className="text-center">
          <p className="text-blue-100 text-sm uppercase tracking-wide mb-2">
            Estimated Investment
          </p>
          <div className="text-4xl md:text-5xl font-bold mb-2">
            {formatCurrency(result.estimatedCostMin)} - {formatCurrency(result.estimatedCostMax)}
          </div>
          <p className="text-blue-100 text-sm">
            Implementation cost range based on your specifications
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {result.timelineWeeks} Weeks
              </p>
              <p className="text-sm text-gray-500">Timeline</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">{result.teamSize}</p>
              <p className="text-sm text-gray-500">Team Size</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cost breakdown */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Cost Breakdown
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Platform Base Cost', value: result.breakdown.baseCost },
            { label: 'User License Cost', value: result.breakdown.userCost },
            { label: 'Module Implementation', value: result.breakdown.moduleCost },
            { label: 'Customization', value: result.breakdown.customizationCost },
            { label: 'Integration', value: result.breakdown.integrationCost },
          ]
            .filter((item) => item.value > 0)
            .map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-medium text-gray-800">
                  {formatCurrency(item.value)}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <h3 className="font-semibold text-gray-800 mb-2 text-center">
          Ready for the Next Step?
        </h3>
        <p className="text-gray-600 text-sm text-center mb-4">
          Get an exact proposal tailored to your business needs from our ERP experts.
        </p>
        <button
          data-cal-link="itsfahis/15min"
          data-cal-namespace="15min"
          data-cal-config={getCalConfig()}
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 btn-glow flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Book Free Consultation with ERP Expert</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
        <button
          onClick={onStartOver}
          className="w-full mt-3 py-2 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
        >
          Start Over with New Estimate
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center mt-6">
        * This is an estimated range based on typical project requirements. Actual costs may vary
        based on specific customizations, integrations, and business requirements.
      </p>
    </div>
  );
}
