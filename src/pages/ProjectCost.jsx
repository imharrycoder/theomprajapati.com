import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, RotateCcw } from 'lucide-react';
import { apiFetch } from '../utils/api.js';

import ProgressBar from '../features/projectCost/components/ProgressBar.jsx';
import ServiceSelector from '../features/projectCost/components/ServiceSelector.jsx';
import QuestionStep from '../features/projectCost/components/QuestionStep.jsx';
import ContactForm from '../features/projectCost/components/ContactForm.jsx';
import AnalysisAnimation from '../features/projectCost/components/AnalysisAnimation.jsx';
import CostBreakdown from '../features/projectCost/components/CostBreakdown.jsx';
import TimelineVisualization from '../features/projectCost/components/TimelineVisualization.jsx';
import DeliverablesList from '../features/projectCost/components/DeliverablesList.jsx';
import RecommendationCard from '../features/projectCost/components/RecommendationCard.jsx';
import TrustSection from '../features/projectCost/components/TrustSection.jsx';
import WhatsAppCTA from '../features/projectCost/components/WhatsAppCTA.jsx';

const STEPS = ['Services', 'Questions', 'Contact', 'Analysis', 'Report'];
const STORAGE_KEY = 'projectCostProgress';

function ProjectCost() {
  const [step, setStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [report, setReport] = useState(null);
  const [leadId, setLeadId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Auto-save progress to localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.selectedServices?.length) setSelectedServices(data.selectedServices);
        if (data.answers) setAnswers(data.answers);
        if (data.step != null && data.step < 3) setStep(data.step);
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    if (step < 3) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedServices, answers, step }));
    }
  }, [selectedServices, answers, step]);

  // Toggle service selection
  const toggleService = useCallback((service) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  }, []);

  // Fetch questions when moving from services to questions
  const fetchQuestions = async () => {
    try {
      const data = await apiFetch('/project-cost/questions', {
        method: 'POST',
        body: JSON.stringify({ services: selectedServices }),
        suppressToast: true,
      });
      setQuestions(data.questions || []);
      setCurrentQuestion(0);
      setStep(1);
    } catch {
      // Fallback: move forward anyway
      setStep(1);
    }
  };

  // Submit contact info and trigger analysis
  const handleContactSubmit = async (info) => {
    setContactInfo(info);
    setStep(3); // Show analysis animation
    setLoading(true);

    try {
      const data = await apiFetch('/project-cost/analyze', {
        method: 'POST',
        body: JSON.stringify({ services: selectedServices, answers }),
        suppressToast: true,
      });
      setReport(data);

      // Save lead
      try {
        const leadData = await apiFetch('/project-cost/leads', {
          method: 'POST',
          body: JSON.stringify({
            ...info,
            services: selectedServices,
            answers,
            report: data,
            conversationLog: data.conversationLog || [],
          }),
          suppressToast: true,
        });
        setLeadId(leadData.id);
      } catch { /* ignore lead save failure */ }
    } catch (err) {
      console.error('Analysis failed:', err);
    } finally {
      setLoading(false);
    }
  };

  // When analysis animation completes
  const handleAnalysisComplete = useCallback(() => {
    if (report) {
      setStep(4);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [report]);

  // Answer a question
  const answerQuestion = (value) => {
    const q = questions[currentQuestion];
    if (q) {
      setAnswers((prev) => ({ ...prev, [q.id]: value }));
    }
  };

  // Navigation
  const canGoNext = () => {
    if (step === 0) return selectedServices.length > 0;
    if (step === 1) return true; // Questions can be skipped
    return false;
  };

  const goNext = () => {
    if (step === 0) {
      fetchQuestions();
    } else if (step === 1) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setStep(2); // Move to contact form
      }
    }
  };

  const goPrev = () => {
    if (step === 1 && currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else if (step === 1 && currentQuestion === 0) {
      setStep(0);
    } else if (step === 2) {
      setStep(1);
      setCurrentQuestion(questions.length - 1);
    } else if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const restart = () => {
    setStep(0);
    setSelectedServices([]);
    setQuestions([]);
    setCurrentQuestion(0);
    setAnswers({});
    setContactInfo({});
    setReport(null);
    setLeadId(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <section className="section-band">
      <div className="shell mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center" data-aos="fade-up">
          <div className="tag mx-auto mb-4 inline-flex">
            <Sparkles size={14} />
            <span>AI Project Planner</span>
          </div>
          <h1 className="text-3xl font-black text-[var(--text)] md:text-4xl">
            Get Your AI Project Cost Estimate
          </h1>
          <p className="mt-3 text-base text-[var(--muted)]">
            Answer a few questions and get an instant cost estimate, timeline, and recommendations
          </p>
        </div>

        {/* Progress Bar */}
        {step < 4 && (
          <ProgressBar currentStep={step} totalSteps={STEPS.length} labels={STEPS} />
        )}

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {/* Step 0: Service Selection */}
          {step === 0 && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="mb-6 text-center text-lg font-bold text-[var(--text)]">
                What services do you need?
                <span className="ml-2 text-sm font-normal text-[var(--muted)]">
                  ({selectedServices.length} selected)
                </span>
              </h2>
              <ServiceSelector selected={selectedServices} onToggle={toggleService} />
            </motion.div>
          )}

          {/* Step 1: Questions */}
          {step === 1 && questions.length > 0 && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mx-auto max-w-lg"
            >
              <p className="mb-6 text-center text-sm text-[var(--muted)]">
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <QuestionStep
                question={questions[currentQuestion]}
                value={answers[questions[currentQuestion]?.id]}
                onChange={answerQuestion}
              />
            </motion.div>
          )}

          {/* Step 2: Contact Form */}
          {step === 2 && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ContactForm onSubmit={handleContactSubmit} loading={loading} />
            </motion.div>
          )}

          {/* Step 3: Analysis Animation */}
          {step === 3 && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AnalysisAnimation onComplete={handleAnalysisComplete} />
            </motion.div>
          )}

          {/* Step 4: Full Report */}
          {step === 4 && report && (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Project Overview Badge */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full border border-[var(--accent)] bg-[var(--accent)]/10 px-4 py-1.5 text-xs font-bold text-[var(--accent)]">
                  {report.complexityLabel}
                </span>
                <span className="rounded-full border border-[var(--accent-2)] bg-[var(--accent-2)]/10 px-4 py-1.5 text-xs font-bold text-[var(--accent-2)]">
                  {report.timeline.total} Working Days
                </span>
                <span className="rounded-full border border-[var(--neon-lime)] bg-[var(--neon-lime)]/10 px-4 py-1.5 text-xs font-bold text-[var(--neon-lime)]">
                  {report.deliverables.length} Deliverables
                </span>
              </div>

              {/* AI Summary */}
              {report.aiSummary && (
                <div className="rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 p-5">
                  <p className="text-sm leading-relaxed text-[var(--text)]">{report.aiSummary}</p>
                </div>
              )}

              {/* Cost Breakdown */}
              <CostBreakdown report={report} />

              {/* Timeline */}
              <TimelineVisualization timeline={report.timeline} deliveryDate={report.estimatedDeliveryDate} />

              {/* Deliverables */}
              <DeliverablesList deliverables={report.deliverables} />

              {/* Recommendations */}
              <RecommendationCard recommendations={report.recommendations} />

              {/* Trust Section */}
              <TrustSection />

              {/* CTA */}
              <WhatsAppCTA report={report} contactInfo={contactInfo} leadId={leadId} />

              {/* Restart */}
              <div className="text-center">
                <button onClick={restart} className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)]">
                  <RotateCcw size={14} />
                  Start a new estimate
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {(step === 0 || step === 1) && (
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={goPrev}
              disabled={step === 0}
              className="btn-secondary flex items-center gap-2 disabled:opacity-30"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <button
              onClick={goNext}
              disabled={!canGoNext()}
              className="btn-primary flex items-center gap-2 disabled:opacity-30"
            >
              {step === 0 ? 'Continue' : currentQuestion < questions.length - 1 ? 'Next Question' : 'Get Estimate'}
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectCost;
