import { HelpCircle } from 'lucide-react';
import SectionHeading from '../../../components/SectionHeading.jsx';
import { defaultSiteContent } from '../../../data/siteContent.js';

const FaqSection = ({ section }) => {
  const items = section.items?.length ? section.items : defaultSiteContent.faq.items;

  return (
    <section className="section-band relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-purple opacity-5 blur-[150px] rounded-[100%] pointer-events-none" />
      <div className="shell relative z-10">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          align="center"
        />
        <div className="mx-auto mt-14 max-w-3xl space-y-4">
          {items.map((item, index) => (
            <details 
              key={item.question} 
              className="neon-card neon-glow-purple p-6 group cursor-pointer" 
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <summary className="text-lg font-bold text-[var(--text)] flex items-center justify-between outline-none">
                <span className="flex items-center gap-3">
                  <HelpCircle size={20} className="text-[var(--neon-purple)]" />
                  {item.question}
                </span>
                <span className="text-[var(--neon-purple)] transition-transform duration-300 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-[var(--line)]">
                <p className="text-sm leading-relaxed text-[var(--muted)]">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
