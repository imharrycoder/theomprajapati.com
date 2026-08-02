import { motion } from 'framer-motion';
import { Shield, Code, Zap, MessageCircle, Heart, Lock, Eye, Rocket } from 'lucide-react';

const trustItems = [
  { icon: Code, label: 'Clean Scalable Architecture' },
  { icon: Eye, label: 'No Hidden Charges' },
  { icon: Zap, label: 'Modern Technologies' },
  { icon: MessageCircle, label: 'Fast Communication' },
  { icon: Heart, label: 'Post-Launch Support' },
  { icon: Lock, label: 'Source Code Ownership' },
  { icon: Shield, label: 'Transparent Pricing' },
  { icon: Rocket, label: 'Future-Ready Solutions' },
];

function TrustSection() {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-gradient-to-br from-[var(--surface)] to-[var(--surface-2)] p-6">
      <h4 className="mb-5 text-center text-sm font-black uppercase tracking-wider text-[var(--text)]">
        Why Choose Us?
      </h4>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {trustItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3 text-center"
            >
              <Icon size={18} className="text-[var(--accent)]" />
              <span className="text-[10px] font-bold uppercase leading-tight text-[var(--muted)]">{item.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default TrustSection;
