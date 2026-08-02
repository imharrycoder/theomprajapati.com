import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/services.js';

const glowColors = ['neon-glow-cyan', 'neon-glow-purple', 'neon-glow-pink', 'neon-glow-lime', 'neon-glow-yellow', 'neon-glow-cyan'];

function ServiceSelector({ selected, onToggle }) {
  return (
    <div className="space-y-10">
      {SERVICE_CATEGORIES.map((category, catIndex) => (
        <div key={category.name}>
          <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-[var(--muted)]">
            {category.name}
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {category.services.map((service) => {
              const isSelected = selected.includes(service.label);
              const IconComponent = Icons[service.icon] || Icons.Circle;
              return (
                <motion.button
                  key={service.label}
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onToggle(service.label)}
                  className={`neon-card ${glowColors[catIndex % glowColors.length]} flex flex-col items-center gap-2 p-4 text-center transition-all ${
                    isSelected
                      ? 'border-[var(--accent)] bg-[var(--accent)]/10 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                      : ''
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-lg ${
                      isSelected
                        ? 'bg-[var(--accent)] text-black'
                        : 'bg-[var(--surface-2)] text-[var(--muted)]'
                    } transition-colors`}
                  >
                    <IconComponent size={20} />
                  </span>
                  <span className={`text-xs font-bold ${isSelected ? 'text-[var(--accent)]' : 'text-[var(--text)]'}`}>
                    {service.label}
                  </span>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-[var(--accent)] text-black"
                    >
                      <Icons.Check size={12} strokeWidth={3} />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ServiceSelector;
