import { ArrowRight } from 'lucide-react';

const ConsultationCtaSection = ({ section }) => (
  <section className="section-band border-y border-[var(--line)] bg-[var(--surface-2)]/55">
    <div className="shell">
      <div className="surface flex flex-col items-center justify-between gap-6 rounded-lg p-8 text-center md:flex-row md:text-left">
        <div>
          <h2 className="text-2xl font-black text-[var(--text)] md:text-4xl">{section.title}</h2>
          <p className="mt-3 max-w-2xl text-lg leading-7 text-[var(--muted)]">{section.description}</p>
        </div>
        <a href={section.ctaUrl} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0">
          {section.cta}
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
);

export default ConsultationCtaSection;
