import { ArrowRight, FolderCode } from 'lucide-react';
import SectionHeading from '../../../components/SectionHeading.jsx';
import SmartLink from '../../../components/SmartLink.jsx';
import { defaultSiteContent } from '../../../data/siteContent.js';

const PortfolioSection = ({ section }) => {
  const items = section.items?.length ? section.items : defaultSiteContent.portfolio.items;
  const glowClasses = ['neon-glow-cyan', 'neon-glow-purple', 'neon-glow-pink', 'neon-glow-lime'];

  return (
    <section className="section-band relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple opacity-5 blur-[120px] rounded-full pointer-events-none" />
      <div className="shell relative z-10">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          align="center"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {items.map((item, index) => (
            <article 
              key={item.title} 
              className={`neon-card ${glowClasses[index % glowClasses.length]} p-8 group`} 
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-start justify-between mb-6">
                <FolderCode size={40} className="text-[var(--text)] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] font-bold">Project_0{index + 1}</span>
              </div>
              <h3 className="text-2xl font-black text-[var(--text)]">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{item.description}</p>
              <SmartLink className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--text)] tracking-widest hover:text-[var(--neon-cyan)] transition-colors" to={item.linkUrl}>
                {item.linkLabel || 'VIEW_PROJECT'}
                <ArrowRight size={16} aria-hidden="true" />
              </SmartLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
