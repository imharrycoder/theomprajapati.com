import SectionHeading from '../../components/SectionHeading.jsx';
import { defaultSiteContent } from '../../data/siteContent.js';

const TechnologiesSection = ({ section }) => {
  const items = section.items?.length ? section.items : defaultSiteContent.technologies.items;

  return (
    <section className="section-band border-y border-[var(--line)] bg-[var(--surface-2)]/55">
      <div className="shell">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          align="center"
        />
        <div className="mt-10 grid grid-cols-2 gap-8 text-center sm:grid-cols-4 lg:grid-cols-6">
          {items.map((tech) => (
            <div key={tech} className="flex flex-col items-center gap-2" data-aos="zoom-in">
              <div className="grid h-16 w-16 place-items-center rounded-lg bg-[var(--surface)] text-2xl font-bold text-[var(--accent)]">
                {tech.slice(0, 2)}
              </div>
              <p className="font-semibold">{tech}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
