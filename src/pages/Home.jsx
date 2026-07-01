import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Play, Sparkles } from 'lucide-react';
import BlogCard from '../components/BlogCard.jsx';
import HeroSlider from '../components/HeroSlider.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { blogPosts, metrics, services, upcomingProjects, videos } from '../data/content.js';

function Home() {
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <>
      <HeroSlider />

      <section className="section-band">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-aos="fade-right">
            <SectionHeading
              eyebrow="About the platform"
              title="A public home for practical building experience."
              description="The platform is shaped around your current skill set and future creator plan: strong content pages now, with a clear path toward memberships, marketplace modules, APIs, and an admin dashboard."
            />
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary" to="/about">
                About The Om
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="btn-secondary" to="/contact">
                Contact
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="surface rounded-lg p-5" data-aos="fade-up">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-[var(--surface-2)] text-[var(--accent)]">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-black text-[var(--text)]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{service.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-band border-y border-[var(--line)] bg-[var(--surface-2)]/55">
        <div className="shell">
          <SectionHeading
            eyebrow="Selected blogs"
            title="Latest thinking from the build desk."
            description="Focused articles around product planning, frontend systems, backend foundations, CMS strategy, deployment, and UI practice."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link className="btn-secondary" to="/blog">
              View all posts
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeading
            eyebrow="Latest videos"
            title="Video modules for people learning by building."
            description="The video section is ready for future API-backed content while staying useful as a polished public preview today."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {videos.map((video) => {
              const Icon = video.icon;
              return (
                <article key={video.title} className="surface group overflow-hidden rounded-lg" data-aos="zoom-in">
                  <div className="tech-grid grid aspect-video place-items-center border-b border-[var(--line)] bg-[var(--surface-2)]">
                    <span className="grid h-16 w-16 place-items-center rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--accent)] transition group-hover:scale-105">
                      <Play size={24} fill="currentColor" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="p-5">
                    <span className="tag">
                      <Icon size={14} aria-hidden="true" />
                      {video.category}
                    </span>
                    <h3 className="mt-4 text-lg font-black leading-tight text-[var(--text)]">{video.title}</h3>
                    <p className="mt-3 text-sm font-bold text-[var(--muted)]">{video.duration}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-band border-y border-[var(--line)] bg-[var(--surface-2)]/55">
        <div className="shell">
          <SectionHeading
            eyebrow="Upcoming projects"
            title="The next modules are already mapped."
            description="These project cards come directly from the long-term platform direction: creator CMS, SaaS marketplace, AI tooling, and stronger admin workflows."
            align="center"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {upcomingProjects.map((project) => {
              const Icon = project.icon;
              return (
                <article key={project.title} className="surface rounded-lg p-6" data-aos="fade-up">
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-lg bg-[var(--surface-2)] text-[var(--accent-3)]">
                      <Icon size={24} aria-hidden="true" />
                    </div>
                    <span className="tag">{project.status}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-black text-[var(--text)]">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{project.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="shell grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <article key={metric.label} className="surface rounded-lg p-5" data-aos="fade-up">
                <div className="flex items-center justify-between gap-3">
                  <Icon className="text-[var(--accent)]" size={24} aria-hidden="true" />
                  <CheckCircle2 className="text-[var(--accent-2)]" size={20} aria-hidden="true" />
                </div>
                <p className="mt-5 text-4xl font-black text-[var(--text)]">{metric.value}</p>
                <p className="mt-2 text-sm font-bold text-[var(--muted)]">{metric.label}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <div className="surface flex flex-col items-start justify-between gap-6 rounded-lg p-6 md:flex-row md:items-center">
            <div>
              <span className="tag">
                <Sparkles size={15} aria-hidden="true" />
                Ready for the next phase
              </span>
              <h2 className="mt-4 text-2xl font-black text-[var(--text)] md:text-4xl">Need a public brand plus product-ready structure?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
                The platform can grow into a real full-stack product with APIs, auth, content storage, subscriptions, and admin tools.
              </p>
            </div>
            <Link className="btn-primary shrink-0" to="/contact">
              Start conversation
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
