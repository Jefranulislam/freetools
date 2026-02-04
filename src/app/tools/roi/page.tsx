'use client';

import { useState } from 'react';
import { ToolHeader, CTASection } from '@/components/tools/shared';
import { useTrackToolVisit } from '@/hooks/useTrackToolVisit';

interface FormData {
  manualHours: number;
  hourlyRate: number;
  errorRate: number;
  penaltyRisk: number;
  systemCost: number;
  employees: number;
}

export default function ROICalculatorPage() {
  // Track tool visit
  useTrackToolVisit('ROI & Compliance Calculator', '/tools/roi');
  
  const [formData, setFormData] = useState<FormData>({
    manualHours: 100,
    hourlyRate: 25,
    errorRate: 5,
    penaltyRisk: 5000,
    systemCost: 15000,
    employees: 20
  });
  const [showResults, setShowResults] = useState(false);

  const calculateROI = () => {
    // Monthly savings from automation (assume 70% reduction in manual work)
    const automationSavings = formData.manualHours * formData.hourlyRate * 0.7;
    
    // Error reduction savings (assume 80% error reduction)
    const errorSavings = (formData.errorRate / 100) * formData.employees * formData.hourlyRate * 40 * 0.8; // 40 hours rework per error
    
    // Compliance risk reduction (assume 90% reduction)
    const complianceSavings = (formData.penaltyRisk * 0.9) / 12; // Monthly
    
    const monthlyTotalSavings = automationSavings + errorSavings + complianceSavings;
    const annualSavings = monthlyTotalSavings * 12;
    const roiPercentage = ((annualSavings - formData.systemCost) / formData.systemCost) * 100;
    const paybackMonths = formData.systemCost / monthlyTotalSavings;

    return {
      monthlySavings: monthlyTotalSavings,
      annualSavings,
      roiPercentage,
      paybackMonths,
      automationSavings,
      errorSavings,
      complianceSavings,
      threeYearROI: (annualSavings * 3 - formData.systemCost)
    };
  };

  const results = calculateROI();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50">
      <ToolHeader
        icon={<span className="text-3xl">📈</span>}
        title="ROI & Compliance Impact Calculator"
        subtitle="Show your CFO the real numbers - Payback period & annual savings"
        gradient="from-secondary-800 to-secondary-900"
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Enter Your Current Metrics</h3>
              
              {/* Manual Hours */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Manual Work Hours (per month)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="20"
                    max="500"
                    value={formData.manualHours}
                    onChange={(e) => setFormData(prev => ({ ...prev, manualHours: parseInt(e.target.value) }))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                  <span className="w-20 text-center font-bold text-secondary-700 bg-primary-50 px-3 py-1 rounded-lg">
                    {formData.manualHours}h
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Data entry, reporting, reconciliation, etc.</p>
              </div>

              {/* Hourly Rate */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Hourly Rate ($)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: parseInt(e.target.value) }))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                  <span className="w-20 text-center font-bold text-secondary-700 bg-primary-50 px-3 py-1 rounded-lg">
                    ${formData.hourlyRate}
                  </span>
                </div>
              </div>

              {/* Number of Employees */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Employees
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="5"
                    max="200"
                    value={formData.employees}
                    onChange={(e) => setFormData(prev => ({ ...prev, employees: parseInt(e.target.value) }))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                  <span className="w-20 text-center font-bold text-secondary-700 bg-primary-50 px-3 py-1 rounded-lg">
                    {formData.employees}
                  </span>
                </div>
              </div>

              {/* Error Rate */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Error Rate (%)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={formData.errorRate}
                    onChange={(e) => setFormData(prev => ({ ...prev, errorRate: parseInt(e.target.value) }))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                  <span className="w-20 text-center font-bold text-secondary-700 bg-primary-50 px-3 py-1 rounded-lg">
                    {formData.errorRate}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Data entry errors, invoice mistakes, etc.</p>
              </div>

              {/* Penalty Risk */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Compliance Penalty Risk ($)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="1000"
                    value={formData.penaltyRisk}
                    onChange={(e) => setFormData(prev => ({ ...prev, penaltyRisk: parseInt(e.target.value) }))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                  <span className="w-24 text-center font-bold text-secondary-700 bg-primary-50 px-3 py-1 rounded-lg text-sm">
                    {formatCurrency(formData.penaltyRisk)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">VAT, tax, audit penalties</p>
              </div>

              {/* System Cost */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ERP/CRM System Cost ($)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="1000"
                    value={formData.systemCost}
                    onChange={(e) => setFormData(prev => ({ ...prev, systemCost: parseInt(e.target.value) }))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                  <span className="w-24 text-center font-bold text-secondary-700 bg-primary-50 px-3 py-1 rounded-lg text-sm">
                    {formatCurrency(formData.systemCost)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Implementation + first year</p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            {/* Main ROI Card */}
            <div className="bg-gradient-to-br from-secondary-700 to-secondary-900 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-medium text-white/80 mb-4">Your ROI Analysis</h3>
              
              <div className="text-center mb-6">
                <p className="text-5xl font-bold mb-1">{results.roiPercentage.toFixed(0)}%</p>
                <p className="text-white/80">First Year ROI</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold">{formatCurrency(results.monthlySavings)}</p>
                  <p className="text-sm text-white/80">Monthly Savings</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold">{results.paybackMonths.toFixed(1)}</p>
                  <p className="text-sm text-white/80">Months to Payback</p>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Savings Breakdown</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⚡</span>
                    <span className="text-gray-700">Automation Savings</span>
                  </div>
                  <span className="font-bold text-blue-600">{formatCurrency(results.automationSavings)}/mo</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🔧</span>
                    <span className="text-gray-700">Error Reduction</span>
                  </div>
                  <span className="font-bold text-orange-600">{formatCurrency(results.errorSavings)}/mo</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📋</span>
                    <span className="text-gray-700">Compliance Risk Reduction</span>
                  </div>
                  <span className="font-bold text-purple-600">{formatCurrency(results.complianceSavings)}/mo</span>
                </div>
              </div>
            </div>

            {/* Long Term */}
            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-green-800 mb-3">📊 Long-Term Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-secondary-700">{formatCurrency(results.annualSavings)}</p>
                  <p className="text-sm text-secondary-700">Annual Savings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-secondary-700">{formatCurrency(results.threeYearROI)}</p>
                  <p className="text-sm text-secondary-700">3-Year Net Benefit</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CFO Summary */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Executive Summary</h3>
          <div className="bg-gray-50 rounded-xl p-4 text-gray-700 leading-relaxed">
            <p className="mb-3">
              Based on your inputs, implementing an ERP/CRM system costing <strong>{formatCurrency(formData.systemCost)}</strong> will generate:
            </p>
            <ul className="space-y-2 ml-4">
              <li>• <strong>{formatCurrency(results.monthlySavings)}</strong> in monthly savings</li>
              <li>• <strong>{formatCurrency(results.annualSavings)}</strong> in annual savings</li>
              <li>• Full payback in <strong>{results.paybackMonths.toFixed(1)} months</strong></li>
              <li>• First year ROI of <strong>{results.roiPercentage.toFixed(0)}%</strong></li>
              <li>• 3-year net benefit of <strong>{formatCurrency(results.threeYearROI)}</strong></li>
            </ul>
            <p className="mt-3 text-secondary-700 font-medium">
              ✅ This investment pays for itself within the first year.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <CTASection
            title="See How ERP Pays for Itself"
            description="Get a detailed implementation plan with guaranteed ROI timelines."
            buttonText="Get Your Custom Proposal"
            gradient="from-secondary-700 to-secondary-900"
            toolName="ROI & Compliance Calculator"
            toolResults={{
              monthlySavings: formatCurrency(results.monthlySavings),
              annualSavings: formatCurrency(results.annualSavings),
              roiPercentage: `${results.roiPercentage.toFixed(0)}%`,
              paybackPeriod: `${results.paybackMonths.toFixed(1)} months`,
              threeYearBenefit: formatCurrency(results.threeYearROI),
              inputs: {
                manualHours: `${formData.manualHours} hours/month`,
                hourlyRate: `$${formData.hourlyRate}/hour`,
                employees: formData.employees,
                systemCost: formatCurrency(formData.systemCost)
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
