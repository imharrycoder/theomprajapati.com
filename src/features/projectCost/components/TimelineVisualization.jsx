import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const phaseLabels = {
  planning: { label: 'Planning', color: 'var(--neon-cyan)' },
  design: { label: 'Design', color: 'var(--neon-purple)' },
  development: { label: 'Development', color: 'var(--neon-yellow)' },
  testing: { label: 'Testing', color: 'var(--neon-pink)' },
  deployment: { label: 'Deployment', color: 'var(--neon-lime)' },
  support: { label: 'Support', color: 'var(--neon-cyan)' },
};

function TimelineVisualization({ timeline, deliveryDate }) {
  const phases = Object.entries(phaseLabels);
  const maxDays = Math.max(...Object.values(timeline).filter(v => typeof v === 'number' && v !== timeline.total));

  return (
    <div className="neon-card neon-glow-lime p-5">
      <h4 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-[var(--neon-lime)]">
        <Calendar size={16} />
        Estimated Timeline — {timeline.total} Working Days
      </h4>

      <div className="space-y-3">
        {phases.map(([key, meta], index) => {
          const days = timeline[key];
          if (!days) return null;
          const widthPercent = (days / maxDays) * 100;

          return (
            <div key={key} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-right text-xs font-bold text-[var(--muted)]">
                {meta.label}
              </span>
              <div className="flex-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(widthPercent, 10)}%` }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex h-8 items-center rounded-lg px-3"
                  style={{ backgroundColor: `color-mix(in srgb, ${meta.color} 25%, transparent)` }}
                >
                  <span className="text-xs font-bold" style={{ color: meta.color }}>
                    {days} {days === 1 ? 'day' : 'days'}
                  </span>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {deliveryDate && (
        <div className="mt-4 rounded-lg border border-[var(--accent)]/20 bg-[var(--accent)]/5 p-3 text-center">
          <span className="text-xs font-bold text-[var(--muted)]">Estimated Delivery: </span>
          <span className="text-sm font-black text-[var(--accent)]">
            {new Date(deliveryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
      )}
    </div>
  );
}

export default TimelineVisualization;
