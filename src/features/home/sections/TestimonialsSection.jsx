import { Star } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading.jsx';
import { defaultSiteContent } from '../../data/siteContent.js';

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

  return (
    <section className="section-band">
      <div className="shell">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          align="center"
        />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {items.map((testimonial) => {
            const rating = Math.max(0, Math.min(Number(testimonial.rating) || MAX_RATING, MAX_RATING));
            const imageClass =
              testimonial.imageType === 'logo'
                ? 'h-14 w-20 rounded-lg bg-white object-contain p-2'
                : 'h-14 w-14 rounded-full object-cover';

            return (
              <blockquote key={`${testimonial.name}-${testimonial.company}`} className="surface rounded-lg p-6" data-aos="fade-up">
                <div className="flex items-center gap-4">
                  {testimonial.showImage && testimonial.imageUrl ? (
                    <img src={testimonial.imageUrl} alt={testimonial.name} className={imageClass} />
                  ) : (
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--surface-2)] text-sm font-black text-[var(--accent)]">
                      {getInitials(testimonial.name) || 'OM'}
                    </span>
                  )}
                  <div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {Array.from({ length: rating }).map((_, s) => (
                        <Star key={s} size={18} fill="currentColor" aria-hidden="true" />
                      ))}
                    </div>
                    <footer className="mt-2 text-sm font-bold text-[var(--muted)]">
                      {testimonial.name}
                      {testimonial.company ? `, ${testimonial.company}` : ''}
                    </footer>
                  </div>
                </div>
                <p className="mt-4 text-lg italic text-[var(--text)]">"{testimonial.quote}"</p>
              </blockquote>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
