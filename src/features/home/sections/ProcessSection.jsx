import SectionHeading from '../../components/SectionHeading.jsx';
import { defaultSiteContent } from '../../data/siteContent.js';

const ProcessSection = ({ section }) => {
  const steps = section.steps?.length ? section.steps : defaultSiteContent.process.steps;

  return (
    <section className="section-band border-y border-[var(--line)] bg-[var(--surface-2)]/55">
      <div className="shell">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          align="center"
        />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="surface rounded-lg p-6 text-center" data-aos="fade-up" data-aos-delay={i * 100}>
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[var(--surface-2)] text-xl font-bold text-[var(--accent)]">
                {i + 1}
              </div>
              <h3 className="mt-5 text-xl font-black text-[var(--text)]">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
