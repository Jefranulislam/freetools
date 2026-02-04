'use client';

import { useState } from 'react';
import { ToolHeader, CTASection, ScoreDisplay, GapItem } from '@/components/tools/shared';

interface Answer {
  [key: string]: number;
}

const auditSections = {
  crm: {
    title: 'Sales & Customer Management (CRM)',
    icon: '👥',
    questions: [
      'Do you track customer follow-ups centrally?',
      'Is your sales pipeline visible in real-time?',
      'Are customer interactions logged automatically?',
      'Do you have automated lead scoring?',
      'Can you generate sales reports instantly?'
    ],
    suggestions: [
      'Implement centralized CRM system',
      'Set up automated follow-up reminders',
      'Enable sales pipeline dashboards'
    ]
  },
  erp: {
    title: 'Inventory & Operations (ERP)',
    icon: '📦',
    questions: [
      'Is inventory tracked in real-time?',
      'Are purchase orders automated?',
      'Do you have visibility into stock levels?',
      'Is your supply chain integrated?',
      'Can you forecast demand accurately?'
    ],
    suggestions: [
      'Implement real-time inventory tracking',
      'Automate purchase order generation',
      'Set up demand forecasting tools'
    ]
  },
  hrm: {
    title: 'HR & Payroll (HRM)',
    icon: '👔',
    questions: [
      'Are payroll & attendance automated?',
      'Is employee onboarding digitized?',
      'Do you have a self-service portal?',
      'Are leave requests handled online?',
      'Is performance review systematic?'
    ],
    suggestions: [
      'Automate payroll processing',
      'Implement employee self-service portal',
      'Digitize attendance tracking'
    ]
  },
  accounting: {
    title: 'Accounting & Compliance',
    icon: '💼',
    questions: [
      'Are financial reports real-time?',
      'Is VAT/tax compliance automated?',
      'Are invoices generated automatically?',
      'Is bank reconciliation automated?',
      'Do you have audit trail for all transactions?'
    ],
    suggestions: [
      'Implement automated invoicing',
      'Set up real-time financial dashboards',
      'Enable automated tax calculations'
    ]
  }
};

const answerOptions = [
  { value: 2, label: 'Yes', color: 'bg-primary-500' },
  { value: 1, label: 'Partial', color: 'bg-yellow-500' },
  { value: 0, label: 'No', color: 'bg-red-500' }
];

export default function AuditToolPage() {
  const [answers, setAnswers] = useState<Answer>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateSectionScore = (sectionKey: string) => {
    const section = auditSections[sectionKey as keyof typeof auditSections];
    let score = 0;
    section.questions.forEach((_, index) => {
      const qId = `${sectionKey}-${index}`;
      if (answers[qId] !== undefined) {
        score += answers[qId];
      }
    });
    return score;
  };

  const totalQuestions = Object.values(auditSections).reduce((acc, section) => acc + section.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const isComplete = answeredQuestions === totalQuestions;

  const totalScore = Object.keys(auditSections).reduce((acc, key) => acc + calculateSectionScore(key), 0);
  const maxScore = totalQuestions * 2;
  const overallPercentage = Math.round((totalScore / maxScore) * 100);

  const getMaturityLevel = () => {
    if (overallPercentage >= 80) return { level: 'Optimized', color: 'text-green-600', desc: 'Your systems are well-integrated and automated.' };
    if (overallPercentage >= 60) return { level: 'Managed', color: 'text-blue-600', desc: 'Good foundation, but room for optimization.' };
    if (overallPercentage >= 40) return { level: 'Developing', color: 'text-yellow-600', desc: 'Basic systems in place, significant gaps exist.' };
    return { level: 'Initial', color: 'text-red-600', desc: 'Manual processes dominate. Urgent need for automation.' };
  };

  const maturity = getMaturityLevel();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50">
      <ToolHeader
        icon={<span className="text-3xl">📋</span>}
        title="Business Process & System Audit"
        subtitle="Assess your system maturity and identify automation opportunities"
        gradient="from-secondary-800 to-secondary-900"
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!showResults ? (
          <>
            {/* Progress */}
            <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Progress</span>
                <span className="text-sm font-bold text-secondary-700">{answeredQuestions}/{totalQuestions}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary-400 to-secondary-600 h-2 rounded-full transition-all"
                  style={{ width: `${(answeredQuestions / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Audit Sections */}
            {Object.entries(auditSections).map(([key, section]) => (
              <div key={key} className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 px-6 py-4 border-b">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{section.icon}</span>
                    <h3 className="font-bold text-gray-800">{section.title}</h3>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {section.questions.map((question, qIndex) => {
                    const qId = `${key}-${qIndex}`;
                    return (
                      <div key={qId} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <p className="text-gray-700 mb-3">{question}</p>
                        <div className="flex gap-2">
                          {answerOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleAnswer(qId, option.value)}
                              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                                answers[qId] === option.value
                                  ? `${option.color} text-white shadow-md`
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Get Results Button */}
            <button
              onClick={() => setShowResults(true)}
              disabled={!isComplete}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                isComplete
                ? 'bg-gradient-to-r from-secondary-700 to-secondary-900 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isComplete ? 'Get Audit Results' : `Answer all questions (${totalQuestions - answeredQuestions} remaining)`}
            </button>
          </>
        ) : (
          <>
            {/* Results */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <div className="text-center mb-8">
                <ScoreDisplay score={totalScore} maxScore={maxScore} label="System Maturity Score" size="lg" />
                <div className="mt-4">
                  <span className={`text-2xl font-bold ${maturity.color}`}>{maturity.level}</span>
                  <p className="text-gray-600 mt-1">{maturity.desc}</p>
                </div>
              </div>

              {/* Department Breakdown */}
              <h3 className="text-lg font-bold text-gray-800 mb-4">Gap Analysis by Department</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(auditSections).map(([key, section]) => (
                  <GapItem
                    key={key}
                    title={section.title}
                    score={calculateSectionScore(key)}
                    maxScore={section.questions.length * 2}
                    suggestions={section.suggestions}
                  />
                ))}
              </div>
            </div>

            {/* Automation Opportunities */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">🚀 Automation Opportunities</h3>
              <div className="space-y-3">
                {Object.entries(auditSections).map(([key, section]) => {
                  const sectionScore = calculateSectionScore(key);
                  const sectionMax = section.questions.length * 2;
                  const percentage = (sectionScore / sectionMax) * 100;
                  if (percentage < 60) {
                    return (
                      <div key={key} className="bg-white rounded-lg p-4 border border-purple-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span>{section.icon}</span>
                          <span className="font-semibold text-gray-800">{section.title}</span>
                        </div>
                        <ul className="space-y-1">
                          {section.suggestions.map((suggestion, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setAnswers({});
                setShowResults(false);
              }}
              className="w-full py-3 border-2 border-purple-200 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-all mb-6"
            >
              Start New Audit
            </button>

            <CTASection
              title="Fix These Gaps Today"
              description="Our experts can implement Odoo or Zoho to address your system gaps and automate your processes."
              buttonText="Get Implementation Quote"
              gradient="from-purple-600 to-pink-600"
              toolName="Business Process & System Audit"
              toolResults={{
                overallScore: `${overallPercentage}%`,
                maturityLevel: maturity.level,
                description: maturity.desc,
                sectionScores: Object.entries(auditSections).map(([key, section]) => ({
                  section: section.title,
                  score: `${Math.round((calculateSectionScore(key) / (section.questions.length * 2)) * 100)}%`
                })),
                gapsIdentified: Object.entries(auditSections)
                  .filter(([key]) => Math.round((calculateSectionScore(key) / (auditSections[key as keyof typeof auditSections].questions.length * 2)) * 100) < 70)
                  .map(([, section]) => section.title)
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
