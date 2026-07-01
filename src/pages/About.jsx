import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading.jsx';
import { roadmap, skillGroups } from '../data/content.js';

function About() {
  return (
    <>
      <section className="section-band border-b border-[var(--line)]">
        <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div data-aos="fade-right">
            <span className="tag">
              <Sparkles size={15} aria-hidden="true" />
              About The Om
            </span>
            <h1 className="mt-5 text-4xl font-black leading-tight text-[var(--text)] md:text-6xl">
              Building practical web skills into a serious creator platform.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
              The Om Prajapati is developing a modern full-stack skill set across frontend, backend, databases, CMS, deployment, and product planning. This site turns that learning path into a professional public brand for blogs, videos, projects, and future SaaS products.
            </p>
            <Link className="btn-primary mt-8" to="/contact">
              Work together
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <div className="surface rounded-lg p-6" data-aos="fade-left">
            <h2 className="text-xl font-black text-[var(--text)]">Current focus</h2>
            <div className="mt-5 grid gap-4">
              {['Advanced React', 'Advanced Node.js', 'Authentication and Authorization', 'Admin Dashboard Development', 'Scalable Web Architecture', 'Performance Optimization', 'SEO-friendly React Websites'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg border border-[var(--line)] bg-[var(--surface-2)] p-3">
                  <CheckCircle2 className="shrink-0 text-[var(--accent-2)]" size={20} aria-hidden="true" />
                  <span className="text-sm font-bold text-[var(--text)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="shell">
          <SectionHeading
            eyebrow="Skill set"
            title="A wide stack with a clear product direction."
            description="The skill set combines frontend craft, backend logic, database design, CMS thinking, deployment knowledge, and UI/UX taste."
            align="center"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {skillGroups.map((group) => {
              const Icon = group.icon;
              return (
                <article key={group.title} className="surface rounded-lg p-5" data-aos="fade-up">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-[var(--surface-2)] text-[var(--accent)]">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-black text-[var(--text)]">{group.title}</h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span key={skill} className="tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-band border-t border-[var(--line)] bg-[var(--surface-2)]/55">
        <div className="shell">
          <SectionHeading
            eyebrow="Roadmap"
            title="From portfolio to self-owned content business."
            description="The current frontend is the first public layer of a larger plan: dynamic content, paywalls, subscriptions, marketplace products, and admin control."
          />
          <div className="mt-10 grid gap-4">
            {roadmap.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="surface grid gap-4 rounded-lg p-5 md:grid-cols-[80px_1fr]" data-aos="fade-up">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-[var(--accent-3)]">0{index + 1}</span>
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-[var(--surface-2)] text-[var(--accent)]">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[var(--text)]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.detail}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
