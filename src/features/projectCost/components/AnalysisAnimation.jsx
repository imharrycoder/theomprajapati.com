import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, BarChart3, Clock, Lightbulb, Sparkles } from 'lucide-react';

const stages = [
  { icon: Brain, label: 'Analyzing Requirements', color: 'var(--neon-cyan)' },
  { icon: BarChart3, label: 'Determining Complexity', color: 'var(--neon-purple)' },
  { icon: Sparkles, label: 'Calculating Costs', color: 'var(--neon-yellow)' },
  { icon: Clock, label: 'Estimating Timeline', color: 'var(--neon-pink)' },
  { icon: Lightbulb, label: 'Generating Recommendations', color: 'var(--neon-lime)' },
];

function AnalysisAnimation({ onComplete }) {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => {
        if (prev >= stages.length - 1) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 600);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center py-16">
      {/* Pulsing brain icon */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-8 grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-3)] text-black shadow-[0_0_40px_rgba(245,158,11,0.4)]"
      >
        <Brain size={36} />
      </motion.div>

      <h3 className="mb-2 text-xl font-bold text-[var(--text)]">
        AI is analyzing your project...
      </h3>
      <p className="mb-10 text-sm text-[var(--muted)]">
        This will take just a moment
      </p>

      {/* Stage indicators */}
      <div className="w-full max-w-sm space-y-3">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = index === activeStage;
          const isDone = index < activeStage;

          return (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0.3, x: -10 }}
              animate={{
                opacity: isDone || isActive ? 1 : 0.3,
                x: 0,
              }}
              transition={{ duration: 0.3 }}
              className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${
                isActive
                  ? 'border-[var(--accent)] bg-[var(--accent)]/10'
                  : isDone
                  ? 'border-[var(--neon-lime)]/30 bg-[var(--neon-lime)]/5'
                  : 'border-[var(--line)] bg-[var(--surface)]'
              }`}
            >
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                isDone
                  ? 'bg-[var(--neon-lime)] text-black'
                  : isActive
                  ? 'bg-[var(--accent)] text-black'
                  : 'bg-[var(--surface-2)] text-[var(--muted)]'
              }`}>
                <Icon size={16} />
              </span>
              <span className={`text-sm font-bold ${
                isActive ? 'text-[var(--accent)]' : isDone ? 'text-[var(--neon-lime)]' : 'text-[var(--muted)]'
              }`}>
                {stage.label}
              </span>
              {isActive && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="ml-auto h-4 w-4 rounded-full border-2 border-[var(--accent)] border-t-transparent"
                />
              )}
              {isDone && (
                <span className="ml-auto text-xs font-bold text-[var(--neon-lime)]">✓</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default AnalysisAnimation;
