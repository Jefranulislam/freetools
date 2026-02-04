'use client';

import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import ResultCard from './ResultCard';
import {
  Step1BusinessType,
  Step2SystemNeeded,
  Step3Platform,
  Step4UserCount,
  Step5Modules,
  Step6Customization,
  Step7Integration,
  Step8Deployment,
} from './steps';
import { FormData, EstimateResult } from '@/lib/types';
import { calculateEstimate } from '@/lib/calculator';
import axios from 'axios';

const STEP_LABELS = [
  'Business',
  'System',
  'Platform',
  'Users',
  'Modules',
  'Custom',
  'Integration',
  'Deploy',
];

const initialFormData: FormData = {
  businessType: '',
  systemNeeded: [],
  platform: '',
  userCount: '',
  modules: [],
  customizationLevel: '',
  integrationNeeded: false,
  deployment: '',
};

export default function Estimator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const totalSteps = 8;

  const updateFormData = (field: keyof FormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 0:
        return formData.businessType !== '';
      case 1:
        return formData.systemNeeded.length > 0;
      case 2:
        return formData.platform !== '';
      case 3:
        return formData.userCount !== '';
      case 4:
        return formData.modules.length > 0;
      case 5:
        return formData.customizationLevel !== '';
      case 6:
        return true; // Integration has a default
      case 7:
        return formData.deployment !== '';
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate result
      setIsSubmitting(true);
      try {
        const estimate = calculateEstimate(formData);
        setResult(estimate);

        // Save to database
        await axios.post('/api/estimates', {
          formData,
          result: estimate,
        });
      } catch (error) {
        console.error('Error saving estimate:', error);
        // Still show result even if save fails
        const estimate = calculateEstimate(formData);
        setResult(estimate);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStartOver = () => {
    setFormData(initialFormData);
    setCurrentStep(0);
    setResult(null);
    setShowContactForm(false);
  };

  const handleGetProposal = () => {
    setShowContactForm(true);
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const companyName = (form.elements.namedItem('companyName') as HTMLInputElement).value;

    try {
      await axios.post('/api/contact', {
        email,
        companyName,
        formData,
        result,
      });
      alert('Thank you! Our team will contact you within 24 hours.');
      setShowContactForm(false);
    } catch (error) {
      console.error('Error submitting contact:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1BusinessType
            value={formData.businessType}
            onChange={(value) => updateFormData('businessType', value)}
          />
        );
      case 1:
        return (
          <Step2SystemNeeded
            value={formData.systemNeeded}
            onChange={(value) => updateFormData('systemNeeded', value)}
          />
        );
      case 2:
        return (
          <Step3Platform
            value={formData.platform}
            onChange={(value) => updateFormData('platform', value)}
          />
        );
      case 3:
        return (
          <Step4UserCount
            value={formData.userCount}
            onChange={(value) => updateFormData('userCount', value)}
          />
        );
      case 4:
        return (
          <Step5Modules
            value={formData.modules}
            onChange={(value) => updateFormData('modules', value)}
            systemNeeded={formData.systemNeeded}
          />
        );
      case 5:
        return (
          <Step6Customization
            value={formData.customizationLevel}
            onChange={(value) => updateFormData('customizationLevel', value)}
          />
        );
      case 6:
        return (
          <Step7Integration
            value={formData.integrationNeeded}
            onChange={(value) => updateFormData('integrationNeeded', value)}
          />
        );
      case 7:
        return (
          <Step8Deployment
            value={formData.deployment}
            onChange={(value) => updateFormData('deployment', value)}
          />
        );
      default:
        return null;
    }
  };

  // Show result
  if (result && !showContactForm) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <ResultCard
          result={result}
          formData={formData}
          onGetProposal={handleGetProposal}
          onStartOver={handleStartOver}
        />
      </div>
    );
  }

  // Show contact form
  if (showContactForm && result) {
    return (
      <div className="w-full max-w-md mx-auto animate-fade-in">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Get Your Exact Proposal
          </h2>
          <p className="text-gray-500">
            Our ERP experts will contact you within 24 hours
          </p>
        </div>

        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Your company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="your@email.com"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 btn-glow"
          >
            Request Proposal
          </button>

          <button
            type="button"
            onClick={() => setShowContactForm(false)}
            className="w-full py-2 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
          >
            ← Back to Results
          </button>
        </form>
      </div>
    );
  }

  // Show form steps
  return (
    <div className="w-full max-w-2xl mx-auto">
      <ProgressBar
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepLabels={STEP_LABELS}
      />

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        {renderStep()}

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
              currentStep === 0
                ? 'opacity-0 cursor-default'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            ← Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed() || isSubmitting}
            className={`px-8 py-2.5 rounded-xl font-semibold transition-all ${
              canProceed()
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-200'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Calculating...
              </span>
            ) : currentStep === totalSteps - 1 ? (
              'Get My Estimate →'
            ) : (
              'Continue →'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
