import { useState } from 'react';
import { Mail, MapPin, MessageSquareText, Phone, Send, Sparkles } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';

const contactCards = [
  { label: 'Email', value: 'hello@theomprajapati.com', icon: Mail },
  { label: 'Location', value: 'India, remote-friendly', icon: MapPin },
  { label: 'Response', value: 'Usually within 24 hours', icon: MessageSquareText },
  { label: 'Project Calls', value: 'Available by request', icon: Phone },
];

function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('Thanks. Your message preview is ready for backend integration.');
    event.currentTarget.reset();
  };

  return (
    <section className="section-band">
      <div className="shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div data-aos="fade-right">
          <SectionHeading
            eyebrow="Contact"
            title="Tell me what you want to build next."
            description="Use this page for frontend work, portfolio sites, blog systems, dashboards, admin panels, or future full-stack product planning."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.label} className="surface rounded-lg p-5">
                  <Icon className="text-[var(--accent)]" size={24} aria-hidden="true" />
                  <h2 className="mt-4 text-sm font-black uppercase text-[var(--text)]">{card.label}</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{card.value}</p>
                </article>
              );
            })}
          </div>
        </div>

        <form className="surface rounded-lg p-5 md:p-7" onSubmit={handleSubmit} data-aos="fade-left">
          <span className="tag">
            <Sparkles size={15} aria-hidden="true" />
            Project intake
          </span>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label>
              <span className="text-sm font-black text-[var(--text)]">Name</span>
              <input
                className="mt-2 h-12 w-full rounded-lg border border-[var(--line)] bg-[var(--surface-2)] px-3 text-sm font-semibold text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                name="name"
                required
                placeholder="Your name"
              />
            </label>
            <label>
              <span className="text-sm font-black text-[var(--text)]">Email</span>
              <input
                className="mt-2 h-12 w-full rounded-lg border border-[var(--line)] bg-[var(--surface-2)] px-3 text-sm font-semibold text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                type="email"
                name="email"
                required
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="text-sm font-black text-[var(--text)]">Project Type</span>
            <select
              className="mt-2 h-12 w-full rounded-lg border border-[var(--line)] bg-[var(--surface-2)] px-3 text-sm font-bold text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
              name="projectType"
              defaultValue="Frontend Website"
            >
              <option>Frontend Website</option>
              <option>Blog Platform</option>
              <option>Dashboard UI</option>
              <option>Full Stack App</option>
              <option>CMS Planning</option>
            </select>
          </label>

          <label className="mt-4 block">
            <span className="text-sm font-black text-[var(--text)]">Message</span>
            <textarea
              className="mt-2 min-h-36 w-full resize-y rounded-lg border border-[var(--line)] bg-[var(--surface-2)] px-3 py-3 text-sm font-semibold text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
              name="message"
              required
              placeholder="Share your idea, timeline, pages, and preferred stack."
            />
          </label>

          <button className="btn-primary mt-5 w-full" type="submit">
            <Send size={18} aria-hidden="true" />
            Send Message
          </button>

          {status ? <p className="mt-4 rounded-lg bg-[var(--surface-2)] p-3 text-sm font-bold text-[var(--accent-2)]">{status}</p> : null}
        </form>
      </div>
    </section>
  );
}

export default Contact;
