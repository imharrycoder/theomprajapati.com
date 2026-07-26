import { ArrowRight, PhoneForwarded } from 'lucide-react';

const ConsultationCtaSection = ({ section }) => (
  <section className="section-band relative py-20">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMGYxNzJhIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMWUyOTNiIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] opacity-20 pointer-events-none" />
    <div className="shell relative z-10">
      <div className="neon-card neon-glow-cyan flex flex-col items-center justify-between gap-8 rounded-2xl p-10 text-center md:flex-row md:text-left border-2 border-[var(--neon-cyan)] shadow-[0_0_30px_rgba(0,243,255,0.2)] bg-gradient-to-r from-[var(--surface)] to-[var(--surface-2)]">
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="hidden md:flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[rgba(0,243,255,0.1)] border border-[var(--neon-cyan)] shadow-[0_0_15px_rgba(0,243,255,0.3)]">
            <PhoneForwarded size={28} className="text-[var(--neon-cyan)]" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-[var(--text)] md:text-4xl tracking-wide uppercase drop-shadow-[0_2px_10px_rgba(0,243,255,0.3)]">{section.title}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">{section.description}</p>
          </div>
        </div>

        <a href={section.ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-primary pulse-neon shrink-0 px-8 py-4 text-lg">
          {section.cta}
          <ArrowRight size={20} aria-hidden="true" className="ml-2" />
        </a>
      </div>
    </div>
  </section>
);

export default ConsultationCtaSection;
