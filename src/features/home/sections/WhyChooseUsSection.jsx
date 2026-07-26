import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading.jsx';
import { defaultSiteContent } from '../../data/siteContent.js';

const WhyChooseUsSection = ({ section }) => {
  const items = section.items?.length ? section.items : defaultSiteContent.whyChoose.items;

  return (
    <section className="section-band">
      <div className="shell">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          align="center"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((reason) => (
            <div key={reason.title} className="surface rounded-lg p-6" data-aos="fade-up">
              <CheckCircle2 className="text-[var(--accent)]" size={24} aria-hidden="true" />
              <h3 className="mt-4 text-xl font-black text-[var(--text)]">{reason.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
