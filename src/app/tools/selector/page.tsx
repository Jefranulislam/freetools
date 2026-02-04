'use client';

import { useState } from 'react';
import { ToolHeader, CTASection } from '@/components/tools/shared';

interface FormData {
  companySize: string;
  industry: string;
  budget: string;
  modules: string[];
  priorities: string[];
}

const companySizes = [
  { value: 'startup', label: 'Startup', users: '1-10 users' },
  { value: 'small', label: 'Small Business', users: '11-50 users' },
  { value: 'medium', label: 'Medium Business', users: '51-200 users' },
  { value: 'large', label: 'Large Enterprise', users: '200+ users' }
];

const industries = [
  'Retail & E-commerce', 'Manufacturing', 'Trading & Distribution',
  'Professional Services', 'Healthcare', 'Education', 'Hospitality', 'Construction'
];

const budgetRanges = [
  { value: 'low', label: 'Under $10K', range: '$5K - $10K' },
  { value: 'medium', label: '$10K - $30K', range: '$10K - $30K' },
  { value: 'high', label: '$30K - $75K', range: '$30K - $75K' },
  { value: 'enterprise', label: '$75K+', range: '$75K+' }
];

const moduleOptions = [
  'Accounting', 'CRM/Sales', 'Inventory', 'HR/Payroll',
  'Manufacturing', 'E-commerce', 'Project Management', 'BI/Analytics'
];

const priorityOptions = [
  'Quick Implementation', 'Low Cost', 'Customization',
  'Scalability', 'Cloud-based', 'Local Support'
];

const platformData = {
  odoo: {
    name: 'Odoo',
    logo: '🟣',
    tagline: 'Open Source ERP',
    pros: [
      'Highly customizable & open source',
      'All-in-one solution (60+ modules)',
      'Lower licensing costs',
      'Active community & marketplace',
      'Self-hosted or cloud options'
    ],
    cons: [
      'Steeper learning curve',
      'Customization requires technical expertise',
      'Enterprise features need paid version'
    ],
    bestFor: ['Manufacturing', 'Trading', 'Medium to Large businesses', 'Companies needing heavy customization'],
    pricing: {
      startup: '$150 - $500/mo',
      small: '$500 - $1,500/mo',
      medium: '$1,500 - $4,000/mo',
      large: '$4,000 - $10,000+/mo'
    },
    implementation: {
      startup: '2-4 weeks',
      small: '4-8 weeks',
      medium: '8-16 weeks',
      large: '16-24 weeks'
    }
  },
  zoho: {
    name: 'Zoho One',
    logo: '🟡',
    tagline: 'Operating System for Business',
    pros: [
      'Very affordable pricing',
      '45+ integrated apps',
      'Quick implementation',
      'User-friendly interface',
      'No-code customization'
    ],
    cons: [
      'Less customizable than Odoo',
      'Limited manufacturing features',
      'Internet dependent (cloud only)'
    ],
    bestFor: ['Small businesses', 'Service companies', 'Startups', 'Teams wanting quick setup'],
    pricing: {
      startup: '$45 - $150/mo',
      small: '$150 - $500/mo',
      medium: '$500 - $1,500/mo',
      large: '$1,500 - $4,000/mo'
    },
    implementation: {
      startup: '1-2 weeks',
      small: '2-4 weeks',
      medium: '4-8 weeks',
      large: '8-12 weeks'
    }
  },
  oracle: {
    name: 'Oracle NetSuite',
    logo: '🔴',
    tagline: 'Enterprise Cloud ERP',
    pros: [
      'Robust enterprise features',
      'Strong financials & compliance',
      'Global multi-currency/entity',
      'Advanced BI & reporting',
      'Proven enterprise scalability'
    ],
    cons: [
      'Higher cost',
      'Longer implementation',
      'Complex for small businesses',
      'Vendor lock-in'
    ],
    bestFor: ['Large enterprises', 'Multi-national companies', 'Complex financials', 'High-growth companies'],
    pricing: {
      startup: 'Not recommended',
      small: '$1,500 - $3,000/mo',
      medium: '$3,000 - $8,000/mo',
      large: '$8,000 - $25,000+/mo'
    },
    implementation: {
      startup: 'N/A',
      small: '8-12 weeks',
      medium: '12-20 weeks',
      large: '20-36 weeks'
    }
  }
};

export default function SelectorPage() {
  const [formData, setFormData] = useState<FormData>({
    companySize: '',
    industry: '',
    budget: '',
    modules: [],
    priorities: []
  });
  const [showResults, setShowResults] = useState(false);

  const toggleModule = (module: string) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.includes(module)
        ? prev.modules.filter(m => m !== module)
        : [...prev.modules, module]
    }));
  };

  const togglePriority = (priority: string) => {
    setFormData(prev => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter(p => p !== priority)
        : [...prev.priorities, priority]
    }));
  };

  const calculateScores = () => {
    let scores = { odoo: 0, zoho: 0, oracle: 0 };

    // Company size scoring
    if (formData.companySize === 'startup') {
      scores.zoho += 3; scores.odoo += 1;
    } else if (formData.companySize === 'small') {
      scores.zoho += 2; scores.odoo += 2;
    } else if (formData.companySize === 'medium') {
      scores.odoo += 3; scores.zoho += 1; scores.oracle += 2;
    } else {
      scores.oracle += 3; scores.odoo += 2;
    }

    // Budget scoring
    if (formData.budget === 'low') {
      scores.zoho += 3; scores.odoo += 1;
    } else if (formData.budget === 'medium') {
      scores.zoho += 2; scores.odoo += 3;
    } else if (formData.budget === 'high') {
      scores.odoo += 3; scores.oracle += 2;
    } else {
      scores.oracle += 3; scores.odoo += 2;
    }

    // Industry scoring
    if (['Manufacturing', 'Trading & Distribution'].includes(formData.industry)) {
      scores.odoo += 2; scores.oracle += 1;
    } else if (['Professional Services', 'Education'].includes(formData.industry)) {
      scores.zoho += 2;
    } else if (formData.industry === 'Retail & E-commerce') {
      scores.odoo += 2; scores.zoho += 1;
    }

    // Priority scoring
    if (formData.priorities.includes('Quick Implementation')) {
      scores.zoho += 2;
    }
    if (formData.priorities.includes('Low Cost')) {
      scores.zoho += 2; scores.odoo += 1;
    }
    if (formData.priorities.includes('Customization')) {
      scores.odoo += 3;
    }
    if (formData.priorities.includes('Scalability')) {
      scores.oracle += 2; scores.odoo += 1;
    }
    if (formData.priorities.includes('Cloud-based')) {
      scores.zoho += 1; scores.oracle += 1;
    }

    // Module scoring
    if (formData.modules.includes('Manufacturing')) {
      scores.odoo += 2; scores.oracle += 1;
    }
    if (formData.modules.includes('HR/Payroll')) {
      scores.odoo += 1; scores.zoho += 1;
    }

    return scores;
  };

  const scores = calculateScores();
  const sortedPlatforms = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key);

  const bestPlatform = sortedPlatforms[0] as keyof typeof platformData;
  const isFormValid = formData.companySize && formData.budget && formData.modules.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50">
      <ToolHeader
        icon={<span className="text-3xl">🎯</span>}
        title="ERP Platform Selector"
        subtitle="Compare Odoo vs Zoho vs Oracle NetSuite - Find your best fit"
        gradient="from-secondary-800 to-secondary-900"
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!showResults ? (
          <div className="space-y-6">
            {/* Company Size */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">1. Company Size</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {companySizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setFormData(prev => ({ ...prev, companySize: size.value }))}
                    className={`p-4 rounded-xl text-center transition-all border-2 ${
                      formData.companySize === size.value
                        ? 'border-primary-500 bg-primary-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-semibold text-gray-800">{size.label}</p>
                    <p className="text-sm text-gray-500">{size.users}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Industry */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">2. Industry</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setFormData(prev => ({ ...prev, industry }))}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
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

            {/* Budget */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">3. Annual Budget</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {budgetRanges.map((budget) => (
                  <button
                    key={budget.value}
                    onClick={() => setFormData(prev => ({ ...prev, budget: budget.value }))}
                    className={`p-4 rounded-xl text-center transition-all border-2 ${
                      formData.budget === budget.value
                        ? 'border-primary-500 bg-primary-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-semibold text-gray-800">{budget.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Modules */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">4. Required Modules</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {moduleOptions.map((module) => (
                  <button
                    key={module}
                    onClick={() => toggleModule(module)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                      formData.modules.includes(module)
                        ? 'bg-secondary-700 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {formData.modules.includes(module) && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {module}
                  </button>
                ))}
              </div>
            </div>

            {/* Priorities */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">5. Priorities (Optional)</h3>
              <div className="flex flex-wrap gap-2">
                {priorityOptions.map((priority) => (
                  <button
                    key={priority}
                    onClick={() => togglePriority(priority)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      formData.priorities.includes(priority)
                        ? 'bg-secondary-700 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>

            {/* Compare Button */}
            <button
              onClick={() => setShowResults(true)}
              disabled={!isFormValid}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                isFormValid
                ? 'bg-gradient-to-r from-secondary-700 to-secondary-900 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Compare Platforms
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Winner Card */}
            <div className={`bg-gradient-to-r ${
              bestPlatform === 'odoo' ? 'from-purple-600 to-violet-600' :
              bestPlatform === 'zoho' ? 'from-yellow-500 to-orange-500' :
              'from-red-600 to-rose-600'
            } rounded-2xl p-6 text-white text-center`}>
              <span className="text-5xl mb-3 block">{platformData[bestPlatform].logo}</span>
              <p className="text-white/80 mb-1">Best Match for You</p>
              <h2 className="text-3xl font-bold mb-1">{platformData[bestPlatform].name}</h2>
              <p className="text-white/80">{platformData[bestPlatform].tagline}</p>
            </div>

            {/* All Platforms Comparison */}
            <div className="space-y-4">
              {sortedPlatforms.map((platformKey, index) => {
                const platform = platformData[platformKey as keyof typeof platformData];
                const sizeKey = formData.companySize as keyof typeof platform.pricing;
                const isRecommended = index === 0;
                
                return (
                  <div 
                    key={platformKey} 
                    className={`bg-white rounded-2xl shadow-sm overflow-hidden ${
                      isRecommended ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    {isRecommended && (
                      <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
                        ⭐ Recommended for You
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">{platform.logo}</span>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{platform.name}</h3>
                          <p className="text-gray-500 text-sm">{platform.tagline}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Pros */}
                        <div>
                          <h4 className="font-semibold text-green-700 mb-2">✅ Pros</h4>
                          <ul className="space-y-1">
                            {platform.pros.map((pro, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">•</span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Cons */}
                        <div>
                          <h4 className="font-semibold text-red-700 mb-2">⚠️ Cons</h4>
                          <ul className="space-y-1">
                            {platform.cons.map((con, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="text-red-500 mt-0.5">•</span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Pricing & Timeline */}
                      <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1">Estimated Cost</p>
                          <p className="font-bold text-gray-800">{platform.pricing[sizeKey]}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500 mb-1">Implementation</p>
                          <p className="font-bold text-gray-800">{platform.implementation[sizeKey]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reset */}
            <button
              onClick={() => setShowResults(false)}
              className="w-full py-3 border-2 border-red-200 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-all"
            >
              Compare Again
            </button>

            <CTASection
              title="We Implement This ERP for You"
              description={`Get ${platformData[bestPlatform].name} implemented by certified experts with guaranteed timelines.`}
              buttonText="Get Implementation Quote"
              gradient="from-red-500 to-rose-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}
