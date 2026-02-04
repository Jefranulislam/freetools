'use client';

import { useState } from 'react';
import { ToolHeader, CTASection } from '@/components/tools/shared';

interface FormData {
  industry: string;
  businessSize: string;
  painPoints: string;
  departments: string[];
  complianceNeeds: string[];
}

const industries = [
  'Retail & E-commerce', 'Manufacturing', 'Healthcare', 'Education', 
  'Real Estate', 'Professional Services', 'Hospitality', 'Logistics',
  'Construction', 'Trading & Distribution', 'Other'
];

const businessSizes = [
  { value: 'startup', label: 'Startup (1-10)', users: '1-10 users' },
  { value: 'small', label: 'Small (11-50)', users: '11-50 users' },
  { value: 'medium', label: 'Medium (51-200)', users: '51-200 users' },
  { value: 'large', label: 'Large (201-500)', users: '201-500 users' },
  { value: 'enterprise', label: 'Enterprise (500+)', users: '500+ users' }
];

const departmentOptions = [
  'Sales & Marketing', 'Finance & Accounting', 'Human Resources',
  'Inventory & Warehouse', 'Manufacturing', 'Customer Service',
  'Procurement', 'Project Management', 'IT & Administration'
];

const complianceOptions = [
  'VAT Compliance', 'GDPR', 'Industry Regulations', 'Financial Auditing',
  'Data Security', 'ISO Standards', 'Labor Laws', 'None Specific'
];

export default function AIGeneratorPage() {
  const [formData, setFormData] = useState<FormData>({
    industry: '',
    businessSize: '',
    painPoints: '',
    departments: [],
    complianceNeeds: []
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleDepartmentToggle = (dept: string) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.includes(dept)
        ? prev.departments.filter(d => d !== dept)
        : [...prev.departments, dept]
    }));
  };

  const handleComplianceToggle = (comp: string) => {
    setFormData(prev => ({
      ...prev,
      complianceNeeds: prev.complianceNeeds.includes(comp)
        ? prev.complianceNeeds.filter(c => c !== comp)
        : [...prev.complianceNeeds, comp]
    }));
  };

  const generateRequirements = () => {
    setIsGenerating(true);
    
    // Simulate AI generation (in production, this would call an API)
    setTimeout(() => {
      const generated = {
        functionalRequirements: generateFunctionalReqs(),
        modules: generateModules(),
        userRoles: generateUserRoles(),
        dataMigration: generateDataMigration(),
        integrations: generateIntegrations(),
        platformRecommendation: generatePlatformRec()
      };
      setResult(generated);
      setIsGenerating(false);
    }, 2000);
  };

  const generateFunctionalReqs = () => {
    const reqs: string[] = [];
    if (formData.departments.includes('Sales & Marketing')) {
      reqs.push('Lead capture and tracking system', 'Sales pipeline management', 'Marketing campaign automation', 'Customer interaction history');
    }
    if (formData.departments.includes('Finance & Accounting')) {
      reqs.push('Multi-currency accounting', 'Automated invoicing', 'Bank reconciliation', 'Financial reporting dashboard');
    }
    if (formData.departments.includes('Human Resources')) {
      reqs.push('Employee database management', 'Payroll processing automation', 'Leave management system', 'Performance tracking');
    }
    if (formData.departments.includes('Inventory & Warehouse')) {
      reqs.push('Real-time inventory tracking', 'Barcode/QR scanning', 'Stock level alerts', 'Multi-warehouse support');
    }
    if (formData.departments.includes('Manufacturing')) {
      reqs.push('Bill of Materials (BOM)', 'Production planning', 'Quality control tracking', 'Work order management');
    }
    if (formData.departments.includes('Customer Service')) {
      reqs.push('Ticket management system', 'Customer portal', 'SLA tracking', 'Knowledge base');
    }
    return reqs.length > 0 ? reqs : ['Core business process automation', 'Centralized data management', 'Reporting & analytics'];
  };

  const generateModules = () => {
    const moduleMap: { [key: string]: string[] } = {
      'Sales & Marketing': ['CRM', 'Marketing Automation', 'Email Marketing'],
      'Finance & Accounting': ['Accounting', 'Invoicing', 'Expenses'],
      'Human Resources': ['HR Management', 'Payroll', 'Recruitment'],
      'Inventory & Warehouse': ['Inventory', 'Warehouse', 'Barcode'],
      'Manufacturing': ['Manufacturing', 'PLM', 'Quality'],
      'Customer Service': ['Helpdesk', 'Live Chat', 'Knowledge Base'],
      'Procurement': ['Purchase', 'Vendor Management'],
      'Project Management': ['Project', 'Timesheets', 'Planning']
    };
    
    const modules: string[] = [];
    formData.departments.forEach(dept => {
      if (moduleMap[dept]) {
        modules.push(...moduleMap[dept]);
      }
    });
    return Array.from(new Set(modules));
  };

  const generateUserRoles = () => {
    const roles: { role: string; access: string }[] = [
      { role: 'Administrator', access: 'Full system access, configuration' }
    ];
    
    if (formData.departments.includes('Sales & Marketing')) {
      roles.push({ role: 'Sales Manager', access: 'CRM, Reports, Team management' });
      roles.push({ role: 'Sales Rep', access: 'Leads, Opportunities, own pipeline' });
    }
    if (formData.departments.includes('Finance & Accounting')) {
      roles.push({ role: 'Finance Manager', access: 'Full accounting, approvals' });
      roles.push({ role: 'Accountant', access: 'Invoices, payments, reconciliation' });
    }
    if (formData.departments.includes('Human Resources')) {
      roles.push({ role: 'HR Manager', access: 'Employee records, payroll, recruitment' });
    }
    if (formData.departments.includes('Inventory & Warehouse')) {
      roles.push({ role: 'Warehouse Manager', access: 'Inventory, transfers, receiving' });
    }
    return roles;
  };

  const generateDataMigration = () => {
    const items: string[] = ['Customer/Contact data'];
    if (formData.departments.includes('Sales & Marketing')) items.push('Sales history', 'Lead database');
    if (formData.departments.includes('Finance & Accounting')) items.push('Chart of accounts', 'Open invoices', 'Historical transactions');
    if (formData.departments.includes('Human Resources')) items.push('Employee records', 'Payroll history');
    if (formData.departments.includes('Inventory & Warehouse')) items.push('Product catalog', 'Stock levels', 'Vendor list');
    return items;
  };

  const generateIntegrations = () => {
    const integrations: string[] = ['Email (SMTP/IMAP)', 'Company website'];
    if (formData.departments.includes('Sales & Marketing')) integrations.push('WhatsApp Business', 'Social media');
    if (formData.departments.includes('Finance & Accounting')) integrations.push('Banking API', 'Payment gateway');
    if (formData.departments.includes('Inventory & Warehouse')) integrations.push('E-commerce platform', 'Shipping providers');
    return integrations;
  };

  const generatePlatformRec = () => {
    const size = formData.businessSize;
    const deptCount = formData.departments.length;
    
    if (size === 'enterprise' || deptCount >= 7) {
      return { platform: 'Odoo Enterprise', reason: 'Best for large-scale, multi-department implementations with full customization needs.' };
    } else if (size === 'large' || deptCount >= 5) {
      return { platform: 'Odoo Community + Custom', reason: 'Cost-effective for growing businesses with specific customization requirements.' };
    } else if (size === 'small' || size === 'startup') {
      return { platform: 'Zoho One', reason: 'All-in-one solution with quick implementation for small teams.' };
    }
    return { platform: 'Odoo Community', reason: 'Balanced option with good customization and scalability.' };
  };

  const isFormValid = formData.industry && formData.businessSize && formData.departments.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50">
      <ToolHeader
        icon={<span className="text-3xl">🤖</span>}
        title="AI Business Requirement Generator"
        subtitle="Generate comprehensive requirement documents for your ERP/CRM project"
        gradient="from-secondary-800 to-secondary-900"
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!result ? (
          <div className="space-y-6">
            {/* Industry Selection */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">1. Select Your Industry</h3>
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

            {/* Business Size */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">2. Business Size</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {businessSizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setFormData(prev => ({ ...prev, businessSize: size.value }))}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      formData.businessSize === size.value
                        ? 'bg-secondary-700 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pain Points */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">3. Current Pain Points</h3>
              <textarea
                value={formData.painPoints}
                onChange={(e) => setFormData(prev => ({ ...prev, painPoints: e.target.value }))}
                placeholder="Describe your current challenges... (e.g., Manual data entry, No visibility into sales, Disconnected systems, Compliance issues)"
                className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary-500 focus:ring-2 focus:ring-secondary-200 transition-all resize-none"
              />
            </div>

            {/* Departments */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">4. Departments Involved</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {departmentOptions.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => handleDepartmentToggle(dept)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                      formData.departments.includes(dept)
                        ? 'bg-secondary-700 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {formData.departments.includes(dept) && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {dept}
                  </button>
                ))}
              </div>
            </div>

            {/* Compliance */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">5. Compliance Requirements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {complianceOptions.map((comp) => (
                  <button
                    key={comp}
                    onClick={() => handleComplianceToggle(comp)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      formData.complianceNeeds.includes(comp)
                        ? 'bg-secondary-700 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {comp}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateRequirements}
              disabled={!isFormValid || isGenerating}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                isFormValid && !isGenerating
                ? 'bg-gradient-to-r from-secondary-700 to-secondary-900 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating Requirements...
                </>
              ) : (
                <>
                  <span>🤖</span>
                  Generate Requirement Document
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Results Header */}
            <div className="bg-gradient-to-r from-secondary-700 to-secondary-900 rounded-2xl p-6 text-white text-center">
              <span className="text-4xl mb-3 block">📄</span>
              <h2 className="text-2xl font-bold mb-1">Your Requirement Document</h2>
              <p className="text-white/80">Generated based on your inputs</p>
            </div>

            {/* Platform Recommendation */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-emerald-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🎯</span>
                <h3 className="text-lg font-bold text-gray-800">Platform Recommendation</h3>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-emerald-700 mb-1">{result.platformRecommendation.platform}</p>
                <p className="text-gray-600">{result.platformRecommendation.reason}</p>
              </div>
            </div>

            {/* Functional Requirements */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Functional Requirements</h3>
              <ul className="space-y-2">
                {result.functionalRequirements.map((req: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700">
                    <span className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {idx + 1}
                    </span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Modules */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📦 Recommended Modules</h3>
              <div className="flex flex-wrap gap-2">
                {result.modules.map((module: string, idx: number) => (
                  <span key={idx} className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium border border-emerald-200">
                    {module}
                  </span>
                ))}
              </div>
            </div>

            {/* User Roles */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">👥 User Roles</h3>
              <div className="space-y-3">
                {result.userRoles.map((role: { role: string; access: string }, idx: number) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">👤</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{role.role}</p>
                      <p className="text-sm text-gray-600">{role.access}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Migration */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Data Migration Needs</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {result.dataMigration.map((item: string, idx: number) => (
                  <div key={idx} className="bg-orange-50 text-orange-700 px-3 py-2 rounded-lg text-sm border border-orange-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Integrations */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">🔗 Integration Points</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {result.integrations.map((item: string, idx: number) => (
                  <div key={idx} className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm border border-blue-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                setResult(null);
                setFormData({ industry: '', businessSize: '', painPoints: '', departments: [], complianceNeeds: [] });
              }}
              className="w-full py-3 border-2 border-emerald-200 text-emerald-600 rounded-xl font-medium hover:bg-emerald-50 transition-all"
            >
              Generate New Document
            </button>

            <CTASection
              title="Convert This to a Live System"
              description="Our team can implement these requirements in Odoo or Zoho within weeks."
              buttonText="Get Implementation Quote"
              gradient="from-emerald-600 to-teal-600"
              toolName="AI Business Requirement Generator"
              toolResults={{
                industry: formData.industry,
                businessSize: businessSizes.find(s => s.value === formData.businessSize)?.label || formData.businessSize,
                departments: formData.departments,
                complianceRequirements: formData.complianceNeeds,
                painPoints: formData.painPoints,
                recommendedPlatform: result.platformRec.platform,
                recommendedModules: result.modules,
                estimatedUsers: result.userRoles.length,
                dataMigrationNeeded: result.dataMigration,
                integrationsRequired: result.integrations
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
