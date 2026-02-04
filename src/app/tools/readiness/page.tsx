'use client';

import { useState } from 'react';
import { ToolHeader, CTASection, ScoreDisplay } from '@/components/tools/shared';

interface Answer {
  [key: string]: number;
}

const assessmentSections = {
  software: {
    title: 'Current Software Usage',
    icon: '💻',
    questions: [
      { q: 'How are you currently managing business operations?', options: ['Paper/Manual', 'Spreadsheets', 'Basic Software', 'Multiple Systems'] },
      { q: 'How many different software tools do you use?', options: ['None', '1-3 tools', '4-7 tools', '8+ tools'] },
      { q: 'Are your current systems integrated?', options: ['No systems', 'Not integrated', 'Partially', 'Fully integrated'] }
    ],
    weights: [1, 1, 1.5]
  },
  data: {
    title: 'Data Quality & Readiness',
    icon: '📊',
    questions: [
      { q: 'Is your customer data centralized and clean?', options: ['Scattered everywhere', 'Partially organized', 'Mostly clean', 'Fully organized'] },
      { q: 'Do you have documented business processes?', options: ['No documentation', 'Some docs', 'Most documented', 'Fully documented'] },
      { q: 'How accurate is your current data?', options: ['Many errors', 'Some errors', 'Mostly accurate', 'Very accurate'] }
    ],
    weights: [1.5, 1, 1]
  },
  process: {
    title: 'Process Maturity',
    icon: '⚙️',
    questions: [
      { q: 'Are your business processes standardized?', options: ['No standards', 'Few standards', 'Most standard', 'Fully standardized'] },
      { q: 'How often do you review and improve processes?', options: ['Never', 'Rarely', 'Sometimes', 'Regularly'] },
      { q: 'Do you have KPIs and metrics defined?', options: ['None', 'Basic', 'Some departments', 'Company-wide'] }
    ],
    weights: [1, 1, 1]
  },
  team: {
    title: 'Staff Readiness',
    icon: '👥',
    questions: [
      { q: 'How tech-savvy is your team?', options: ['Not at all', 'Basic skills', 'Comfortable', 'Very proficient'] },
      { q: 'Is there resistance to change?', options: ['High resistance', 'Some resistance', 'Open to change', 'Eager for change'] },
      { q: 'Do you have an IT person/team?', options: ['No', 'Part-time/External', 'Dedicated person', 'IT department'] }
    ],
    weights: [1, 1.5, 0.5]
  },
  infrastructure: {
    title: 'Infrastructure',
    icon: '🏗️',
    questions: [
      { q: 'Internet connectivity quality?', options: ['Poor/None', 'Basic', 'Good', 'Excellent'] },
      { q: 'Do employees have computers/devices?', options: ['Shared only', 'Some have', 'Most have', 'All have'] },
      { q: 'Budget allocated for IT?', options: ['No budget', 'Limited', 'Moderate', 'Sufficient'] }
    ],
    weights: [1, 0.5, 1.5]
  }
};

export default function ReadinessPage() {
  const [answers, setAnswers] = useState<Answer>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const totalQuestions = Object.values(assessmentSections).reduce(
    (acc, section) => acc + section.questions.length, 0
  );
  const answeredQuestions = Object.keys(answers).length;
  const isComplete = answeredQuestions === totalQuestions;

  const calculateSectionScore = (sectionKey: string) => {
    const section = assessmentSections[sectionKey as keyof typeof assessmentSections];
    let score = 0;
    let maxScore = 0;
    section.questions.forEach((_, index) => {
      const qId = `${sectionKey}-${index}`;
      const weight = section.weights[index];
      maxScore += 3 * weight;
      if (answers[qId] !== undefined) {
        score += answers[qId] * weight;
      }
    });
    return { score, maxScore, percentage: Math.round((score / maxScore) * 100) };
  };

  const calculateOverallScore = () => {
    let totalScore = 0;
    let totalMax = 0;
    Object.keys(assessmentSections).forEach(key => {
      const { score, maxScore } = calculateSectionScore(key);
      totalScore += score;
      totalMax += maxScore;
    });
    return Math.round((totalScore / totalMax) * 100);
  };

  const overallScore = calculateOverallScore();

  const getReadinessLevel = () => {
    if (overallScore >= 80) return { level: 'Highly Ready', color: 'text-green-600', bg: 'bg-green-50', desc: 'You are well-prepared for ERP implementation. Proceed with confidence!' };
    if (overallScore >= 60) return { level: 'Moderately Ready', color: 'text-blue-600', bg: 'bg-blue-50', desc: 'Good foundation with some areas to address before implementation.' };
    if (overallScore >= 40) return { level: 'Partially Ready', color: 'text-yellow-600', bg: 'bg-yellow-50', desc: 'Several gaps need attention. Pre-ERP preparation recommended.' };
    return { level: 'Not Ready', color: 'text-red-600', bg: 'bg-red-50', desc: 'Significant preparation needed before ERP implementation.' };
  };

  const readiness = getReadinessLevel();

  const generateChecklist = () => {
    const checklist: { priority: string; task: string; timeframe: string }[] = [];
    
    Object.entries(assessmentSections).forEach(([key]) => {
      const { percentage } = calculateSectionScore(key);
      if (percentage < 60) {
        if (key === 'data') {
          checklist.push({ priority: 'High', task: 'Clean and organize existing data', timeframe: '2-4 weeks' });
          checklist.push({ priority: 'High', task: 'Document data formats and standards', timeframe: '1 week' });
        }
        if (key === 'process') {
          checklist.push({ priority: 'Medium', task: 'Document current business processes', timeframe: '2-3 weeks' });
          checklist.push({ priority: 'Medium', task: 'Define KPIs for each department', timeframe: '1-2 weeks' });
        }
        if (key === 'team') {
          checklist.push({ priority: 'High', task: 'Identify ERP champions in each department', timeframe: '1 week' });
          checklist.push({ priority: 'Medium', task: 'Plan change management communication', timeframe: '1 week' });
        }
        if (key === 'infrastructure') {
          checklist.push({ priority: 'High', task: 'Upgrade internet connectivity if needed', timeframe: '1-2 weeks' });
          checklist.push({ priority: 'Medium', task: 'Ensure adequate hardware for all users', timeframe: '2-3 weeks' });
        }
        if (key === 'software') {
          checklist.push({ priority: 'Low', task: 'List all current software and their data', timeframe: '1 week' });
        }
      }
    });

    return checklist.slice(0, 6); // Limit to top 6 items
  };

  const getRiskAreas = () => {
    const risks: { area: string; score: number; risk: string; impact: string }[] = [];
    Object.entries(assessmentSections).forEach(([key, section]) => {
      const { percentage } = calculateSectionScore(key);
      if (percentage < 50) {
        risks.push({
          area: section.title,
          score: percentage,
          risk: percentage < 30 ? 'Critical' : 'High',
          impact: key === 'data' ? 'Data migration failures' :
                  key === 'team' ? 'User adoption issues' :
                  key === 'process' ? 'Workflow disruptions' :
                  key === 'infrastructure' ? 'Performance problems' :
                  'Integration challenges'
        });
      }
    });
    return risks;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-primary-50">
      <ToolHeader
        icon={<span className="text-3xl">✅</span>}
        title="ERP Readiness Assessment"
        subtitle="Check if your company is ready for ERP implementation"
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

            {/* Assessment Sections */}
            {Object.entries(assessmentSections).map(([key, section]) => (
              <div key={key} className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 px-6 py-4 border-b">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{section.icon}</span>
                    <h3 className="font-bold text-gray-800">{section.title}</h3>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  {section.questions.map((question, qIndex) => {
                    const qId = `${key}-${qIndex}`;
                    return (
                      <div key={qId} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <p className="text-gray-700 mb-3 font-medium">{question.q}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {question.options.map((option, optIndex) => (
                            <button
                              key={optIndex}
                              onClick={() => handleAnswer(qId, optIndex)}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                answers[qId] === optIndex
                                  ? 'bg-secondary-700 text-white shadow-md'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {option}
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
              {isComplete ? 'Get Readiness Report' : `Answer all questions (${totalQuestions - answeredQuestions} remaining)`}
            </button>
          </>
        ) : (
          <>
            {/* Results */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <div className="text-center mb-8">
                <ScoreDisplay score={overallScore} maxScore={100} label="Readiness Score" size="lg" />
                <div className={`mt-4 inline-block px-6 py-2 rounded-full ${readiness.bg}`}>
                  <span className={`text-xl font-bold ${readiness.color}`}>{readiness.level}</span>
                </div>
                <p className="text-gray-600 mt-3 max-w-md mx-auto">{readiness.desc}</p>
              </div>

              {/* Section Breakdown */}
              <h3 className="text-lg font-bold text-gray-800 mb-4">Assessment by Category</h3>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(assessmentSections).map(([key, section]) => {
                  const { percentage } = calculateSectionScore(key);
                  return (
                    <div key={key} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{section.icon}</span>
                        <span className="font-medium text-gray-800 text-sm">{section.title}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            percentage >= 70 ? 'bg-green-500' :
                            percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-right text-sm font-bold text-gray-600">{percentage}%</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Risk Areas */}
            {getRiskAreas().length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-bold text-red-800 mb-4">⚠️ Risk Areas</h3>
                <div className="space-y-3">
                  {getRiskAreas().map((risk, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 border border-red-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-800">{risk.area}</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          risk.risk === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {risk.risk} Risk
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Potential Impact: {risk.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pre-ERP Checklist */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Pre-ERP Action Checklist</h3>
              <div className="space-y-3">
                {generateChecklist().map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className={`text-xs font-bold px-2 py-1 rounded flex-shrink-0 ${
                      item.priority === 'High' ? 'bg-red-100 text-red-700' :
                      item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {item.priority}
                    </span>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">{item.task}</p>
                      <p className="text-sm text-gray-500">Timeframe: {item.timeframe}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setAnswers({});
                setShowResults(false);
              }}
              className="w-full py-3 border-2 border-indigo-200 text-indigo-600 rounded-xl font-medium hover:bg-indigo-50 transition-all mb-6"
            >
              Start New Assessment
            </button>

            <CTASection
              title="Let Our Experts Prepare You for ERP Success"
              description="We'll help you address gaps and ensure a smooth ERP implementation."
              buttonText="Get Pre-ERP Consultation"
              gradient="from-indigo-600 to-violet-600"
              toolName="ERP Readiness Assessment"
              toolResults={{
                overallScore: `${overallScore}%`,
                readinessLevel: readiness.level,
                description: readiness.desc,
                sectionScores: Object.entries(assessmentSections).map(([key, section]) => ({
                  section: section.title,
                  score: `${calculateSectionScore(key).percentage}%`
                })),
                riskAreas: getRiskAreas().map(r => r.area),
                preImplementationChecklist: generateChecklist().map(c => c.task)
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
