import { ArrowRight } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading.jsx';
import SmartLink from '../../components/SmartLink.jsx';
import { defaultSiteContent } from '../../data/siteContent.js';

const PortfolioSection = ({ section }) => {
  const items = section.items?.length ? section.items : defaultSiteContent.portfolio.items;

  return (
    <section className="section-band">
      <div className="shell">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          align="center"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.title} className="surface rounded-lg p-6" data-aos="fade-up">
              <h3 className="text-xl font-black text-[var(--text)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
              <SmartLink className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--accent)]" to={item.linkUrl}>
                {item.linkLabel || 'View project'}
                <ArrowRight size={17} aria-hidden="true" />
              </SmartLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
