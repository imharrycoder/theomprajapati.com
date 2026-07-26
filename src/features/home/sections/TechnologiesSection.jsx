import SectionHeading from '../../../components/SectionHeading.jsx';
import { defaultSiteContent } from '../../../data/siteContent.js';
import { Terminal } from 'lucide-react';
import { SiReact, SiJavascript, SiPython, SiNodedotjs, SiHtml5, SiCss, SiTypescript, SiTailwindcss, SiMongodb, SiMysql, SiPostgresql, SiNextdotjs } from 'react-icons/si';

// Helper to get the correct brand icon
const getTechIcon = (techName) => {
  const name = techName.toLowerCase();
  if (name.includes('react')) return SiReact;
  if (name.includes('javascript') || name === 'js') return SiJavascript;
  if (name.includes('python')) return SiPython;
  if (name.includes('node')) return SiNodedotjs;
  if (name.includes('html')) return SiHtml5;
  if (name.includes('css')) return SiCss;
  if (name.includes('typescript') || name === 'ts') return SiTypescript;
  if (name.includes('tailwind')) return SiTailwindcss;
  if (name.includes('mongo')) return SiMongodb;
  if (name.includes('mysql')) return SiMysql;
  if (name.includes('postgres')) return SiPostgresql;
  if (name.includes('next')) return SiNextdotjs;
  return Terminal; // Fallback
};

const TechnologiesSection = ({ section }) => {
  const items = section.items?.length ? section.items : defaultSiteContent.technologies.items;

  // Alternate neon colors for tech chips
  const neonBorders = [
    'border-[rgba(59,130,246,0.4)] shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] text-[var(--neon-cyan)]',
    'border-[rgba(245,158,11,0.4)] shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] text-[var(--neon-purple)]',
    'border-[rgba(255,140,0,0.4)] shadow-[0_0_15px_rgba(255,140,0,0.2)] hover:shadow-[0_0_25px_rgba(255,140,0,0.6)] text-[var(--neon-pink)]',
    'border-[rgba(250,204,21,0.4)] shadow-[0_0_15px_rgba(250,204,21,0.2)] hover:shadow-[0_0_25px_rgba(250,204,21,0.6)] text-[var(--neon-lime)]',
    'border-[rgba(255,215,0,0.4)] shadow-[0_0_15px_rgba(255,215,0,0.2)] hover:shadow-[0_0_25px_rgba(255,215,0,0.6)] text-[var(--neon-yellow)]'
  ];

  return (
    <section className="section-band tech-grid border-y border-[rgba(245,158,11,0.1)] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)] pointer-events-none" />
      <div className="shell relative z-10">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          align="center"
        />
        <div className="mt-14 flex flex-wrap justify-center gap-6 sm:gap-8">
          {items.map((tech, index) => {
            const style = neonBorders[index % neonBorders.length];
            const Icon = getTechIcon(tech);
            return (
              <div 
                key={tech} 
                className={`flex items-center gap-3 px-6 py-4 rounded-xl border bg-[var(--surface)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 cursor-default ${style}`}
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                <Icon size={24} className="opacity-90 drop-shadow-[0_0_5px_currentColor]" />
                <span className="font-bold tracking-wider text-[var(--text)]">{tech}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
