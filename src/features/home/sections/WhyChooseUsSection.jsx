import { CheckCircle2, ShieldCheck, Zap, Award, Target, Infinity } from 'lucide-react';
import SectionHeading from '../../../components/SectionHeading.jsx';
import { defaultSiteContent } from '../../../data/siteContent.js';

const WhyChooseUsSection = ({ section }) => {
  const items = section.items?.length ? section.items : defaultSiteContent.whyChoose.items;
  const icons = [ShieldCheck, Zap, Award, Target, Infinity, CheckCircle2];
  const glowClasses = ['neon-glow-cyan', 'neon-glow-pink', 'neon-glow-yellow', 'neon-glow-lime', 'neon-glow-purple'];

  return (
    <section className="section-band relative">
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-neon-cyan opacity-5 blur-[150px] rounded-full pointer-events-none" />
      <div className="shell relative z-10">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          align="center"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((reason, index) => {
            const Icon = icons[index % icons.length];
            const textColors = ['text-[var(--neon-cyan)]', 'text-[var(--neon-pink)]', 'text-[var(--neon-yellow)]', 'text-[var(--neon-lime)]', 'text-[var(--neon-purple)]'];
            const textColor = textColors[index % textColors.length];
            return (
              <div 
                key={reason.title} 
                className={`neon-card ${glowClasses[index % glowClasses.length]} p-8 group`} 
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className={`mb-6 inline-flex items-center justify-center h-14 w-14 rounded-xl bg-[var(--surface-3)] border border-[var(--line)] group-hover:scale-110 transition-transform duration-300 ${textColor}`}>
                  <Icon className="opacity-80 group-hover:opacity-100" size={28} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-black text-[var(--text)]">{reason.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
