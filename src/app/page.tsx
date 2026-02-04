'use client';

import Link from 'next/link';
import Image from 'next/image';

const tools = [
  {
    id: 'estimator',
    title: 'Business System Cost Estimator',
    description: 'Get instant cost estimates for ERP, CRM, HRM implementations. Compare Odoo, Zoho & Custom solutions.',
    icon: '💰',
    gradient: 'from-primary-400 to-secondary-700',
    tag: 'Most Popular'
  },
  {
    id: 'audit',
    title: 'Business Process & System Audit',
    description: 'Assess your current systems maturity. Identify gaps in CRM, ERP, HRM & Accounting processes.',
    icon: '📋',
    gradient: 'from-secondary-600 to-secondary-900',
    tag: 'Gap Analysis'
  },
  {
    id: 'ai-generator',
    title: 'AI Business Requirement Generator',
    description: 'Generate comprehensive requirement documents using AI. Perfect for RFPs and vendor discussions.',
    icon: '🤖',
    gradient: 'from-primary-500 to-primary-700',
    tag: 'AI Powered'
  },
  {
    id: 'planner',
    title: 'ERP/CRM Module Planner',
    description: 'Plan your implementation in phases. Avoid overbuying and reduce implementation risk.',
    icon: '📊',
    gradient: 'from-primary-400 to-primary-600',
    tag: 'Phase-Wise'
  },
  {
    id: 'roi',
    title: 'ROI & Compliance Calculator',
    description: 'Calculate monthly savings, annual ROI, and payback period. Convince CFOs with data.',
    icon: '📈',
    gradient: 'from-secondary-500 to-secondary-800',
    tag: 'For Decision Makers'
  },
  {
    id: 'selector',
    title: 'ERP Platform Selector',
    description: 'Compare Odoo vs Oracle vs Zoho. Find the best-fit platform for your business.',
    icon: '🎯',
    gradient: 'from-primary-500 to-secondary-600',
    tag: 'Comparison Tool'
  },
  {
    id: 'readiness',
    title: 'ERP Readiness Assessment',
    description: 'Check if your company is ERP-ready. Get a pre-implementation checklist and risk report.',
    icon: '✅',
    gradient: 'from-secondary-600 to-secondary-800',
    tag: 'Pre-ERP Check'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-900 via-secondary-800 to-secondary-700 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image 
              src="/fahis.png" 
              alt="FAHIS Logo" 
              width={120} 
              height={60}
              className="h-16 w-auto object-contain"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Free Business Tools</h1>
          <p className="text-primary-300 text-lg max-w-2xl mx-auto">
            Powerful tools to help you evaluate, plan, and implement your business systems
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.id}`}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-300 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                  {tool.icon}
                </div>
                <span className="text-xs font-medium text-secondary-700 bg-primary-100 px-3 py-1 rounded-full">
                  {tool.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-secondary-700 transition-colors">
                {tool.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {tool.description}
              </p>
              <div className="flex items-center text-secondary-700 text-sm font-medium">
                <span>Use Tool</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 bg-gradient-to-r from-secondary-800 to-secondary-900 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Need Help Implementing?</h2>
          <p className="text-primary-300 mb-6 max-w-xl mx-auto">
            Our experts can help you implement Odoo, Zoho, or custom solutions tailored to your business needs.
          </p>
          <a
            href="#contact"
            target="_parent"
            className="inline-flex items-center gap-2 bg-primary-400 text-secondary-900 px-8 py-3 rounded-xl font-semibold hover:bg-primary-300 transition-all shadow-lg"
          >
            Get Free Consultation
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} FAHIS. Free tools for businesses everywhere.</p>
        </footer>
      </div>
    </div>
  );
}
