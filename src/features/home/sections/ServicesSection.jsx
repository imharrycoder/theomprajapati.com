import { ArrowRight } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading.jsx';
import SmartLink from '../../components/SmartLink.jsx';

const ServicesSection = ({ section, services }) => (
  <section className="section-band">
    <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div data-aos="fade-right">
        <SectionHeading eyebrow={section.eyebrow} title={section.title} description={section.description} />
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <SmartLink className="btn-primary" to={section.ctaPath}>
            {section.cta}
            <ArrowRight size={18} aria-hidden="true" />
          </SmartLink>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <article key={service.id ?? service.title} className="surface rounded-lg p-5" data-aos="fade-up">
            {service.category ? <span className="tag">{service.category}</span> : null}
            <h3 className="mt-5 text-lg font-black text-[var(--text)]">{service.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{service.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
