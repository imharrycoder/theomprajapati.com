import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

function DeliverablesList({ deliverables }) {
  return (
    <div className="neon-card neon-glow-purple p-5">
      <h4 className="mb-4 text-sm font-black uppercase tracking-wider text-[var(--accent)]">
        Project Deliverables
      </h4>
      <div className="grid gap-2 sm:grid-cols-2">
        {deliverables.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-2.5"
          >
            <CheckCircle size={16} className="shrink-0 text-[var(--neon-lime)]" />
            <span className="text-sm text-[var(--text)]">{item}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default DeliverablesList;
