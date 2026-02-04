// Form step types
export interface FormData {
  businessType: string;
  systemNeeded: string[];
  platform: string;
  userCount: string;
  modules: string[];
  customizationLevel: string;
  integrationNeeded: boolean;
  deployment: string;
  email?: string;
  companyName?: string;
}

// Estimate result types
export interface EstimateResult {
  estimatedCostMin: number;
  estimatedCostMax: number;
  timelineWeeks: number;
  teamSize: string;
  breakdown: CostBreakdown;
}

export interface CostBreakdown {
  baseCost: number;
  userCost: number;
  moduleCost: number;
  customizationCost: number;
  integrationCost: number;
}

// Options for form fields
export const BUSINESS_TYPES = [
  { value: 'retail', label: 'Retail', icon: '🛒' },
  { value: 'manufacturing', label: 'Manufacturing', icon: '🏭' },
  { value: 'service', label: 'Service', icon: '💼' },
  { value: 'ngo', label: 'NGO', icon: '🤝' },
] as const;

export const SYSTEMS = [
  { value: 'crm', label: 'CRM', description: 'Customer Relationship Management', icon: '👥' },
  { value: 'erp', label: 'ERP', description: 'Enterprise Resource Planning', icon: '📊' },
  { value: 'hrm', label: 'HRM', description: 'Human Resource Management', icon: '👨‍💼' },
  { value: 'accounting', label: 'Accounting & Compliance', description: 'Financial Management', icon: '💰' },
] as const;

export const PLATFORMS = [
  { value: 'odoo', label: 'Odoo', description: 'Open Source ERP', color: '#714B67' },
  { value: 'zoho', label: 'Zoho', description: 'Cloud-based Suite', color: '#D92228' },
  { value: 'custom', label: 'Custom Development', description: 'Tailored Solution', color: '#3B82F6' },
] as const;

export const USER_COUNTS = [
  { value: '1-10', label: '1-10 Users', multiplier: 1 },
  { value: '11-50', label: '11-50 Users', multiplier: 1.5 },
  { value: '51-200', label: '51-200 Users', multiplier: 2.5 },
  { value: '200+', label: '200+ Users', multiplier: 4 },
] as const;

export const MODULES = {
  crm: [
    { value: 'lead_management', label: 'Lead Management' },
    { value: 'contact_management', label: 'Contact Management' },
    { value: 'sales_pipeline', label: 'Sales Pipeline' },
    { value: 'email_integration', label: 'Email Integration' },
    { value: 'reporting', label: 'Reporting & Analytics' },
    { value: 'marketing_automation', label: 'Marketing Automation' },
  ],
  erp: [
    { value: 'inventory', label: 'Inventory Management' },
    { value: 'procurement', label: 'Procurement' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'supply_chain', label: 'Supply Chain' },
    { value: 'project_management', label: 'Project Management' },
    { value: 'asset_management', label: 'Asset Management' },
  ],
  hrm: [
    { value: 'recruitment', label: 'Recruitment' },
    { value: 'onboarding', label: 'Employee Onboarding' },
    { value: 'payroll', label: 'Payroll' },
    { value: 'attendance', label: 'Attendance & Leave' },
    { value: 'performance', label: 'Performance Management' },
    { value: 'training', label: 'Training & Development' },
  ],
  accounting: [
    { value: 'general_ledger', label: 'General Ledger' },
    { value: 'accounts_payable', label: 'Accounts Payable' },
    { value: 'accounts_receivable', label: 'Accounts Receivable' },
    { value: 'tax_compliance', label: 'Tax Compliance' },
    { value: 'financial_reporting', label: 'Financial Reporting' },
    { value: 'budgeting', label: 'Budgeting & Forecasting' },
  ],
} as const;

export const CUSTOMIZATION_LEVELS = [
  { value: 'low', label: 'Low', description: 'Minor UI/UX adjustments', multiplier: 1 },
  { value: 'medium', label: 'Medium', description: 'Custom workflows & reports', multiplier: 1.5 },
  { value: 'high', label: 'High', description: 'Deep customization & integrations', multiplier: 2.5 },
] as const;

export const DEPLOYMENTS = [
  { value: 'cloud', label: 'Cloud', description: 'Hosted solution, no infrastructure needed', icon: '☁️' },
  { value: 'on-premise', label: 'On-Premise', description: 'Self-hosted on your servers', icon: '🖥️' },
] as const;
