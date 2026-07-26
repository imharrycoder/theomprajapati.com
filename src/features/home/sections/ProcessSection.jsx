import { Lightbulb, Settings, Rocket } from 'lucide-react';
import SectionHeading from '../../../components/SectionHeading.jsx';
import { defaultSiteContent } from '../../../data/siteContent.js';

const ProcessSection = ({ section }) => {
  const steps = section.steps?.length ? section.steps : defaultSiteContent.process.steps;
  const icons = [Lightbulb, Settings, Rocket];
  const glowClasses = ['neon-glow-pink', 'neon-glow-cyan', 'neon-glow-lime'];

  return (
    <section className="section-band border-y border-[rgba(245,158,11,0.1)] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(245,158,11,0.03)] to-transparent pointer-events-none" />
      <div className="shell relative z-10">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          align="center"
        />
        <div className="mt-16 grid gap-8 md:grid-cols-3 relative">
          {/* Circuit connection line */}
          <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[var(--neon-pink)] via-[var(--neon-cyan)] to-[var(--neon-lime)] opacity-30 z-0" />
          
          {steps.map((step, i) => {
            const Icon = icons[i % icons.length];
            const textColors = ['text-[var(--neon-pink)]', 'text-[var(--neon-cyan)]', 'text-[var(--neon-lime)]'];
            const textColor = textColors[i % textColors.length];
            return (
              <div 
                key={step.title} 
                className={`neon-card ${glowClasses[i % glowClasses.length]} p-8 text-center relative z-10`} 
                data-aos="fade-up" 
                data-aos-delay={i * 150}
              >
                <div className={`mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-current bg-[var(--surface-3)] mb-6 shadow-[0_0_20px_currentColor] ${textColor}`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-black text-[var(--text)] uppercase tracking-wider">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
