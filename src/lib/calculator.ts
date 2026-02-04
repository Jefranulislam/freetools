import { FormData, EstimateResult, CostBreakdown, USER_COUNTS, CUSTOMIZATION_LEVELS } from './types';

// Base costs by platform (in USD)
const PLATFORM_BASE_COSTS = {
  odoo: { min: 5000, max: 8000 },
  zoho: { min: 3000, max: 5000 },
  custom: { min: 15000, max: 25000 },
};

// Cost per user tier
const USER_COSTS = {
  '1-10': { min: 500, max: 1000 },
  '11-50': { min: 2000, max: 4000 },
  '51-200': { min: 5000, max: 10000 },
  '200+': { min: 10000, max: 20000 },
};

// Cost per module
const MODULE_COST = { min: 500, max: 1500 };

// Integration cost
const INTEGRATION_COST = { min: 2000, max: 5000 };

// Timeline calculation (weeks)
const BASE_TIMELINE = {
  odoo: 4,
  zoho: 3,
  custom: 8,
};

// Team size based on project complexity
function calculateTeamSize(totalCost: number): string {
  if (totalCost < 15000) return '2-3 specialists';
  if (totalCost < 40000) return '3-5 specialists';
  if (totalCost < 80000) return '5-8 specialists';
  return '8+ specialists';
}

// Calculate timeline based on complexity
function calculateTimeline(
  platform: string,
  moduleCount: number,
  customizationLevel: string,
  integrationNeeded: boolean
): number {
  let weeks = BASE_TIMELINE[platform as keyof typeof BASE_TIMELINE] || 6;
  
  // Add weeks for modules
  weeks += Math.ceil(moduleCount / 2);
  
  // Customization level adds time
  if (customizationLevel === 'medium') weeks += 2;
  if (customizationLevel === 'high') weeks += 4;
  
  // Integration adds time
  if (integrationNeeded) weeks += 2;
  
  return weeks;
}

export function calculateEstimate(formData: FormData): EstimateResult {
  const {
    platform,
    userCount,
    modules,
    customizationLevel,
    integrationNeeded,
  } = formData;

  // 1. Base cost by platform
  const baseCost = PLATFORM_BASE_COSTS[platform as keyof typeof PLATFORM_BASE_COSTS] || PLATFORM_BASE_COSTS.custom;

  // 2. User cost
  const userCost = USER_COSTS[userCount as keyof typeof USER_COSTS] || USER_COSTS['1-10'];

  // 3. Module cost (number of modules selected)
  const moduleCostTotal = {
    min: modules.length * MODULE_COST.min,
    max: modules.length * MODULE_COST.max,
  };

  // 4. Customization multiplier
  const customizationMultiplier = CUSTOMIZATION_LEVELS.find(
    (c) => c.value === customizationLevel
  )?.multiplier || 1;

  // 5. Integration cost
  const integrationCost = integrationNeeded
    ? INTEGRATION_COST
    : { min: 0, max: 0 };

  // Calculate subtotal before customization
  const subtotalMin = baseCost.min + userCost.min + moduleCostTotal.min + integrationCost.min;
  const subtotalMax = baseCost.max + userCost.max + moduleCostTotal.max + integrationCost.max;

  // Apply customization multiplier
  const estimatedCostMin = Math.round(subtotalMin * customizationMultiplier);
  const estimatedCostMax = Math.round(subtotalMax * customizationMultiplier);

  // Calculate timeline
  const timelineWeeks = calculateTimeline(
    platform,
    modules.length,
    customizationLevel,
    integrationNeeded
  );

  // Calculate team size
  const avgCost = (estimatedCostMin + estimatedCostMax) / 2;
  const teamSize = calculateTeamSize(avgCost);

  // Breakdown for display
  const breakdown: CostBreakdown = {
    baseCost: (baseCost.min + baseCost.max) / 2,
    userCost: (userCost.min + userCost.max) / 2,
    moduleCost: (moduleCostTotal.min + moduleCostTotal.max) / 2,
    customizationCost: Math.round(
      ((subtotalMin + subtotalMax) / 2) * (customizationMultiplier - 1)
    ),
    integrationCost: (integrationCost.min + integrationCost.max) / 2,
  };

  return {
    estimatedCostMin,
    estimatedCostMax,
    timelineWeeks,
    teamSize,
    breakdown,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
