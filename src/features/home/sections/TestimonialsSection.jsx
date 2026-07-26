import { Star, MessageSquareQuote } from 'lucide-react';
import SectionHeading from '../../../components/SectionHeading.jsx';
import { defaultSiteContent } from '../../../data/siteContent.js';

const MAX_RATING = 5;
const MAX_INITIALS = 2;

function getInitials(value = '') {
  return value
    .split(' ')
    .filter(Boolean)
    .slice(0, MAX_INITIALS)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

const TestimonialsSection = ({ section }) => {
  const items = section.items?.length ? section.items : defaultSiteContent.testimonials.items;
  const glowClasses = ['neon-glow-yellow', 'neon-glow-cyan', 'neon-glow-pink'];

  return (
    <section className="section-band relative overflow-hidden">
      {/* Background neon orb */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-neon-yellow opacity-5 blur-[150px] rounded-full pointer-events-none" />
      <div className="shell relative z-10">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          align="center"
        />
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {items.map((testimonial, index) => {
            const rating = Math.max(0, Math.min(Number(testimonial.rating) || MAX_RATING, MAX_RATING));
            const imageClass =
              testimonial.imageType === 'logo'
                ? 'h-16 w-24 rounded-lg bg-[var(--surface-3)] object-contain p-2 border border-[var(--line)]'
                : 'h-16 w-16 rounded-full object-cover border-2 border-[var(--neon-yellow)] shadow-[0_0_15px_rgba(255,251,0,0.3)]';

            return (
              <blockquote 
                key={`${testimonial.name}-${testimonial.company}`} 
                className={`neon-card ${glowClasses[index % glowClasses.length]} p-8 relative`} 
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <MessageSquareQuote size={40} className="absolute top-6 right-6 opacity-10 text-[var(--neon-yellow)]" />
                
                <div className="flex items-center gap-5">
                  {testimonial.showImage && testimonial.imageUrl ? (
                    <img src={testimonial.imageUrl} alt={testimonial.name} className={imageClass} />
                  ) : (
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-[rgba(255,251,0,0.1)] border-2 border-[var(--neon-yellow)] shadow-[0_0_15px_rgba(255,251,0,0.3)] text-xl font-black text-[var(--neon-yellow)] tracking-wider">
                      {getInitials(testimonial.name) || 'OM'}
                    </span>
                  )}
                  <div>
                    <div className="flex items-center gap-1.5 text-[var(--neon-yellow)] drop-shadow-[0_0_5px_rgba(255,251,0,0.5)]">
                      {Array.from({ length: rating }).map((_, s) => (
                        <Star key={s} size={16} fill="currentColor" aria-hidden="true" />
                      ))}
                    </div>
                    <footer className="mt-3 text-sm font-bold text-[var(--text)] tracking-wide">
                      {testimonial.name}
                      {testimonial.company ? <span className="block text-xs font-normal text-[var(--muted)] mt-1">{testimonial.company}</span> : ''}
                    </footer>
                  </div>
                </div>
                <p className="mt-6 text-lg italic text-[var(--muted)] leading-relaxed">"{testimonial.quote}"</p>
              </blockquote>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
