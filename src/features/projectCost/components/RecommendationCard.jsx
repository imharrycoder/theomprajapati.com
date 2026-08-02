import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

function RecommendationCard({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div>
      <h4 className="mb-4 text-sm font-black uppercase tracking-wider text-[var(--accent-3)]">
        AI Recommendations
      </h4>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((rec, index) => {
          const IconComponent = Icons[rec.icon] || Icons.Lightbulb;
          const glowClass = ['neon-glow-cyan', 'neon-glow-purple', 'neon-glow-pink', 'neon-glow-lime', 'neon-glow-yellow', 'neon-glow-cyan'][index % 6];

          return (
            <motion.div
              key={rec.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`neon-card ${glowClass} p-4`}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--surface-2)] text-[var(--accent)]">
                  <IconComponent size={16} />
                </span>
                <h5 className="text-sm font-bold text-[var(--text)]">{rec.title}</h5>
              </div>
              <p className="text-xs leading-5 text-[var(--muted)]">{rec.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default RecommendationCard;
