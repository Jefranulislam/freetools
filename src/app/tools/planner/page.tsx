'use client';

import { useState } from 'react';
import { ToolHeader, CTASection, PhaseCard } from '@/components/tools/shared';

interface FormData {
  businessGoal: string;
  budgetRange: string;
  teamReadiness: string;
  urgency: string;
  industry: string;
}

const businessGoals = [
  { value: 'growth', label: 'Growth & Expansion', icon: '📈' },
  { value: 'compliance', label: 'Compliance & Regulations', icon: '📋' },
  { value: 'efficiency', label: 'Operational Efficiency', icon: '⚡' },
  { value: 'cost', label: 'Cost Reduction', icon: '💰' }
];

const budgetRanges = [
  { value: 'low', label: 'Under $10K' },
  { value: 'medium', label: '$10K - $50K' },
  { value: 'high', label: '$50K - $100K' },
  { value: 'enterprise', label: '$100K+' }
];

const teamReadinessOptions = [
  { value: 'not-ready', label: 'Not Ready - Need training' },
  { value: 'somewhat', label: 'Somewhat - Basic tech skills' },
  { value: 'ready', label: 'Ready - Tech-savvy team' },
  { value: 'expert', label: 'Expert - IT department exists' }
];

const urgencyOptions = [
  { value: 'immediate', label: 'Immediate (< 1 month)' },
  { value: 'soon', label: 'Soon (1-3 months)' },
  { value: 'planned', label: 'Planned (3-6 months)' },
  { value: 'exploring', label: 'Exploring (6+ months)' }
];

const industries = [
  'Retail', 'Manufacturing', 'Services', 'Healthcare', 'Trading', 'Construction', 'Other'
];

const moduleLibrary = {
  core: ['Accounting', 'Invoicing', 'Contacts'],
  sales: ['CRM', 'Sales Pipeline', 'Quotations'],
  inventory: ['Inventory', 'Warehouse', 'Barcode'],
  hr: ['Employees', 'Payroll', 'Attendance'],
  manufacturing: ['Manufacturing', 'PLM', 'Quality'],
  advanced: ['BI Dashboard', 'Automation Rules', 'AI Predictions'],
  support: ['Helpdesk', 'Live Chat', 'Knowledge Base']
};

export default function PlannerPage() {
  const [formData, setFormData] = useState<FormData>({
    businessGoal: '',
    budgetRange: '',
    teamReadiness: '',
    urgency: '',
    industry: ''
  });
  const [showResults, setShowResults] = useState(false);

  const isFormValid = formData.businessGoal && formData.budgetRange && formData.teamReadiness && formData.urgency;

  const generatePhases = () => {
    const phases = [];
    
    // Phase 1: Core modules based on goal
    let phase1Modules: string[] = [...moduleLibrary.core];
    let phase1Timeline = '30-45 days';
    
    if (formData.businessGoal === 'growth') {
      phase1Modules = [...phase1Modules, ...moduleLibrary.sales];
    } else if (formData.businessGoal === 'compliance') {
      phase1Modules = [...phase1Modules, 'Audit Trail', 'Tax Compliance'];
    } else if (formData.businessGoal === 'efficiency') {
      phase1Modules = [...phase1Modules, ...moduleLibrary.inventory.slice(0, 2)];
    } else {
      phase1Modules = [...phase1Modules, 'Expense Tracking', 'Budget Management'];
    }

    if (formData.urgency === 'immediate') {
      phase1Timeline = '15-30 days';
    }

    phases.push({
      phase: 1,
      title: 'Foundation',
      description: 'Essential modules to digitize core business operations immediately.',
      modules: phase1Modules,
      timeline: phase1Timeline,
      priority: 'high' as const
    });

    // Phase 2: Optimization modules
    let phase2Modules: string[] = [];
    
    if (!phase1Modules.includes('CRM')) phase2Modules.push('CRM');
    if (!phase1Modules.includes('Inventory')) phase2Modules.push(...moduleLibrary.inventory);
    if (formData.industry === 'Manufacturing') phase2Modules.push('Manufacturing', 'BOM');
    phase2Modules.push(...moduleLibrary.hr.slice(0, 2));
    
    phases.push({
      phase: 2,
      title: 'Optimization',
      description: 'Expand capabilities and integrate additional departments.',
      modules: phase2Modules,
      timeline: '45-60 days',
      priority: 'medium' as const
    });

    // Phase 3: Advanced automation
    let phase3Modules = [...moduleLibrary.advanced, ...moduleLibrary.support];
    if (formData.teamReadiness === 'expert') {
      phase3Modules.push('API Integrations', 'Custom Reports');
    }
    if (formData.budgetRange === 'enterprise') {
      phase3Modules.push('Multi-company', 'Advanced Analytics');
    }

    phases.push({
      phase: 3,
      title: 'Advanced Automation',
      description: 'Leverage AI, analytics, and advanced features for competitive advantage.',
      modules: phase3Modules,
      timeline: '60-90 days',
      priority: 'low' as const
    });

    return phases;
  };

  const phases = generatePhases();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50">
      <ToolHeader
        icon={<span className="text-3xl">📊</span>}
        title="ERP/CRM Module Planner"
        subtitle="Plan your implementation in phases - Stop overbuying & reduce risk"
        gradient="from-secondary-800 to-secondary-900"
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!showResults ? (
          <div className="space-y-6">
            {/* Business Goal */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">1. What's Your Primary Business Goal?</h3>
              <div className="grid grid-cols-2 gap-3">
                {businessGoals.map((goal) => (
                  <button
                    key={goal.value}
                    onClick={() => setFormData(prev => ({ ...prev, businessGoal: goal.value }))}
                    className={`p-4 rounded-xl text-left transition-all border-2 ${
                      formData.businessGoal === goal.value
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{goal.icon}</span>
                    <span className="font-medium text-gray-800">{goal.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Range */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">2. Budget Range</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {budgetRanges.map((budget) => (
                  <button
                    key={budget.value}
                    onClick={() => setFormData(prev => ({ ...prev, budgetRange: budget.value }))}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      formData.budgetRange === budget.value
                        ? 'bg-secondary-700 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {budget.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Team Readiness */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">3. Team Readiness</h3>
              <div className="grid grid-cols-2 gap-2">
                {teamReadinessOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData(prev => ({ ...prev, teamReadiness: option.value }))}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      formData.teamReadiness === option.value
                        ? 'bg-secondary-700 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">4. Implementation Urgency</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {urgencyOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData(prev => ({ ...prev, urgency: option.value }))}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      formData.urgency === option.value
                        ? 'bg-secondary-700 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Industry */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">5. Industry (Optional)</h3>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setFormData(prev => ({ ...prev, industry }))}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      formData.industry === industry
                        ? 'bg-secondary-700 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={() => setShowResults(true)}
              disabled={!isFormValid}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                isFormValid
                ? 'bg-gradient-to-r from-secondary-700 to-secondary-900 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Generate Implementation Plan
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Results Header */}
            <div className="bg-gradient-to-r from-secondary-700 to-secondary-900 rounded-2xl p-6 text-white text-center">
              <span className="text-4xl mb-3 block">🗓️</span>
              <h2 className="text-2xl font-bold mb-1">Your Phase-Wise Implementation Plan</h2>
              <p className="text-white/80">Optimized for {formData.businessGoal === 'growth' ? 'Growth' : formData.businessGoal === 'compliance' ? 'Compliance' : formData.businessGoal === 'efficiency' ? 'Efficiency' : 'Cost Reduction'}</p>
            </div>

            {/* Phase Cards */}
            <div className="space-y-6">
              {phases.map((phase) => (
                <PhaseCard key={phase.phase} {...phase} />
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📌 Implementation Summary</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-3xl font-bold text-orange-600">{phases.reduce((acc, p) => acc + p.modules.length, 0)}</p>
                  <p className="text-sm text-gray-600">Total Modules</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-3xl font-bold text-orange-600">3</p>
                  <p className="text-sm text-gray-600">Phases</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-3xl font-bold text-orange-600">3-6</p>
                  <p className="text-sm text-gray-600">Months Total</p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-amber-800 mb-3">💡 Pro Tips</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-amber-700">
                  <span className="text-amber-500">✓</span>
                  Start with Phase 1 to see quick wins and build team confidence
                </li>
                <li className="flex items-start gap-2 text-amber-700">
                  <span className="text-amber-500">✓</span>
                  Wait 2-4 weeks between phases for user adoption
                </li>
                <li className="flex items-start gap-2 text-amber-700">
                  <span className="text-amber-500">✓</span>
                  Document processes before automation
                </li>
              </ul>
            </div>

            {/* Reset */}
            <button
              onClick={() => setShowResults(false)}
              className="w-full py-3 border-2 border-orange-200 text-orange-600 rounded-xl font-medium hover:bg-orange-50 transition-all"
            >
              Adjust & Regenerate Plan
            </button>

            <CTASection
              title="Implement Phase-1 in 30-60 Days"
              description="Our experts can fast-track your Phase 1 implementation with guaranteed timelines."
              buttonText="Start Phase 1 Now"
              gradient="from-orange-500 to-amber-500"
              toolName="ERP/CRM Module Planner"
              toolResults={{
                businessGoal: businessGoals.find(g => g.value === formData.businessGoal)?.label || formData.businessGoal,
                budgetRange: budgetRanges.find(b => b.value === formData.budgetRange)?.label || formData.budgetRange,
                teamReadiness: teamReadinessOptions.find(t => t.value === formData.teamReadiness)?.label || formData.teamReadiness,
                implementationUrgency: urgencyOptions.find(u => u.value === formData.urgency)?.label || formData.urgency,
                industry: formData.industry || 'Not specified',
                phases: phases.map(p => ({
                  phase: p.phase,
                  title: p.title,
                  modules: p.modules.join(', '),
                  timeline: p.timeline
                }))
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
