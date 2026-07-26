import SectionHeading from '../../components/SectionHeading.jsx';
import { defaultSiteContent } from '../../data/siteContent.js';

const FaqSection = ({ section }) => {
  const items = section.items?.length ? section.items : defaultSiteContent.faq.items;

  return (
    <section className="section-band">
      <div className="shell">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          align="center"
        />
        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {items.map((item) => (
            <details key={item.question} className="surface rounded-lg p-4" data-aos="fade-up">
              <summary className="cursor-pointer text-lg font-bold text-[var(--text)]">{item.question}</summary>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
