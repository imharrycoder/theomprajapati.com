import { ArrowRight, Code, MonitorSmartphone, Server, Shield, Database, Cpu } from 'lucide-react';
import SectionHeading from '../../../components/SectionHeading.jsx';
import SmartLink from '../../../components/SmartLink.jsx';

// Map icons to categories or use a default
const getServiceIcon = (index) => {
  const icons = [Code, MonitorSmartphone, Server, Shield, Database, Cpu];
  const Icon = icons[index % icons.length];
  return <Icon size={32} className="mb-4 text-[var(--text)] opacity-80" />;
};

// Map glow colors
const glowClasses = ['neon-glow-cyan', 'neon-glow-purple', 'neon-glow-pink', 'neon-glow-lime', 'neon-glow-yellow'];

const ServicesSection = ({ section, services }) => (
  <section className="section-band relative overflow-hidden">
    {/* Decorative background glow */}
    <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-neon-cyan opacity-10 blur-[100px] rounded-full pointer-events-none" />
    
    <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] relative z-10">
      <div data-aos="fade-right">
        <SectionHeading eyebrow={section.eyebrow} title={section.title} description={section.description} />
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <SmartLink className="btn-primary" to={section.ctaPath}>
            {section.cta}
            <ArrowRight size={18} aria-hidden="true" />
          </SmartLink>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {services.map((service, index) => (
          <article 
            key={service.id ?? service.title} 
            className={`neon-card ${glowClasses[index % glowClasses.length]} p-6 flex flex-col`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {getServiceIcon(index)}
            {service.category ? <span className="tag mb-3 self-start text-xs border-[var(--line)] bg-[var(--surface-3)] text-[var(--text)]">{service.category}</span> : null}
            <h3 className="mt-2 text-xl font-black text-[var(--text)]">{service.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)] flex-grow">{service.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
