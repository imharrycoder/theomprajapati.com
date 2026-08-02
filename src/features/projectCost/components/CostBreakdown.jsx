import { motion } from 'framer-motion';
import { IndianRupee } from 'lucide-react';

function CostBreakdown({ report }) {
  return (
    <div className="space-y-8">
      {/* ── Total Cost Banner ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="overflow-hidden rounded-2xl border border-[var(--accent)]/30 bg-gradient-to-r from-[var(--accent)]/10 to-[var(--accent-3)]/10 p-6 text-center"
      >
        <p className="text-sm font-bold uppercase tracking-wider text-[var(--muted)]">Estimated Total Cost</p>
        <p className="mt-2 text-4xl font-black text-[var(--accent)] md:text-5xl">
          ₹{report.totalCost.toLocaleString('en-IN')}
        </p>
        {report.recurringCost > 0 && (
          <p className="mt-2 text-sm text-[var(--muted)]">
            + ₹{report.recurringCost.toLocaleString('en-IN')}/month recurring
          </p>
        )}
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* ── Developer Cost ── */}
        <div className="neon-card neon-glow-purple p-5">
          <h4 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-[var(--accent)]">
            <IndianRupee size={16} />
            Developer Charges
          </h4>
          <div className="space-y-2">
            {Object.entries(report.devBreakdown).map(([label, cost]) => (
              <div key={label} className="flex items-center justify-between border-b border-[var(--line)] pb-2">
                <span className="text-sm text-[var(--text)]">{label}</span>
                <span className="text-sm font-bold text-[var(--text)]">₹{cost.toLocaleString('en-IN')}</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2">
              <span className="font-bold text-[var(--accent)]">Total Developer Cost</span>
              <span className="font-black text-[var(--accent)]">₹{report.developerCost.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* ── Third Party Costs ── */}
        <div className="neon-card neon-glow-cyan p-5">
          <h4 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-[var(--accent-2)]">
            <IndianRupee size={16} />
            Third Party Services
          </h4>
          <div className="space-y-2">
            {report.thirdPartyItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between border-b border-[var(--line)] pb-2">
                <span className="text-sm text-[var(--text)]">{item.label}</span>
                <span className="text-sm font-bold text-[var(--text)]">
                  {item.cost === 0 ? 'Free' : `₹${item.cost.toLocaleString('en-IN')}`}
                  {item.period && <span className="ml-1 text-xs text-[var(--muted)]">/{item.period}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CostBreakdown;
