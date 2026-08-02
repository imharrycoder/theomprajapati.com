import { motion } from 'framer-motion';

function ProgressBar({ currentStep, totalSteps, labels }) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-8">
      {/* Step indicators */}
      <div className="mb-3 flex items-center justify-between">
        {labels.map((label, index) => (
          <div key={label} className="flex flex-col items-center">
            <div
              className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition-all ${
                index <= currentStep
                  ? 'bg-[var(--accent)] text-black shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                  : 'bg-[var(--surface-2)] text-[var(--muted)]'
              }`}
            >
              {index + 1}
            </div>
            <span className={`mt-1 hidden text-[10px] font-bold uppercase sm:block ${
              index <= currentStep ? 'text-[var(--accent)]' : 'text-[var(--muted)]'
            }`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-3)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
