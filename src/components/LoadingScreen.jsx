import { AnimatePresence, motion } from 'framer-motion';

function LoadingScreen({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-[var(--bg)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
        >
          <div className="grid place-items-center gap-5 text-center">
            <div className="loader-ring" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold uppercase text-[var(--accent)]">Booting creator system</p>
              <p className="mt-2 text-xs text-[var(--muted)]">Loading interface modules...</p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default LoadingScreen;
