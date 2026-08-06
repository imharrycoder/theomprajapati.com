import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, GraduationCap, Briefcase, Code, LayoutTemplate } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import SectionHeading from '../components/SectionHeading.jsx';
import { defaultSiteContent } from '../data/siteContent.js';
import { apiFetch } from '../utils/api.js';

function About() {
  const [aboutPage, setAboutPage] = useState(defaultSiteContent.aboutPage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/site-content', { suppressToast: true })
      .then((data) => {
        if (data && data.aboutPage) {
          setAboutPage(data.aboutPage);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!aboutPage) return null;

  return (
    <>
      {/* Hero Section */}
      {aboutPage.hero?.enabled !== false && (
        <section className="section-band border-b border-[var(--line)] pt-32 pb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple opacity-10 blur-[120px] rounded-full pointer-events-none" />
          <div className="shell relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div data-aos="fade-right">
              <span className="tag mb-6 inline-flex items-center gap-2">
                <Sparkles size={15} aria-hidden="true" className="text-neon-cyan" />
                About Me
              </span>
              <h1 className="text-4xl font-black leading-tight text-[var(--text)] md:text-5xl lg:text-6xl mb-6">
                {aboutPage.hero.title}
              </h1>
              <div className="text-lg leading-relaxed text-[var(--muted)] prose prose-invert max-w-none">
                <ReactMarkdown>{aboutPage.hero.description}</ReactMarkdown>
              </div>
              <Link className="btn-primary mt-10 inline-flex items-center gap-2" to="/contact">
                Work together
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            
            <div className="relative" data-aos="fade-left">
              <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/20 to-neon-cyan/20 rounded-2xl blur-3xl opacity-50" />
              <div className="surface rounded-2xl p-8 border border-[var(--line)] relative z-10">
                <h2 className="text-2xl font-black text-[var(--text)] flex items-center gap-3 mb-6">
                  <LayoutTemplate className="text-neon-cyan" />
                  {aboutPage.services?.title || 'Services'}
                </h2>
                <div className="grid gap-3">
                  {(aboutPage.services?.items || []).slice(0, 6).map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface-2)] p-4 hover:border-neon-cyan/50 transition-colors">
                      <CheckCircle2 className="shrink-0 text-neon-cyan" size={20} aria-hidden="true" />
                      <span className="text-sm font-bold text-[var(--text)]">{item}</span>
                    </div>
                  ))}
                  {aboutPage.services?.items?.length > 6 && (
                    <div className="text-center mt-2 text-sm text-[var(--muted)]">
                      + {aboutPage.services.items.length - 6} more services
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Vision & Mission */}
      {(aboutPage.vision?.enabled !== false || aboutPage.mission?.enabled !== false) && (
        <section className="section-band bg-[var(--surface-2)]/30">
          <div className="shell grid gap-8 md:grid-cols-2">
            {aboutPage.vision?.enabled !== false && (
              <article className="surface p-8 rounded-2xl border border-[var(--line)] relative overflow-hidden group" data-aos="fade-up">
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/20 blur-3xl group-hover:bg-neon-purple/30 transition-colors" />
                <h2 className="text-sm font-black uppercase tracking-widest text-[var(--accent)] mb-4">{aboutPage.vision.title}</h2>
                <h3 className="text-2xl font-bold text-[var(--text)] mb-4">{aboutPage.vision.heading}</h3>
                <div className="text-[var(--muted)] leading-relaxed prose prose-invert mb-8">
                  <ReactMarkdown>{aboutPage.vision.description}</ReactMarkdown>
                </div>
                
                <div className="grid gap-6">
                  {(aboutPage.vision.principles || []).map(p => (
                    <div key={p.title}>
                      <h4 className="text-lg font-bold text-[var(--text)] mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                        {p.title}
                      </h4>
                      <p className="text-sm text-[var(--muted)] leading-relaxed">{p.description}</p>
                    </div>
                  ))}
                </div>
                
                {aboutPage.vision.footer && (
                  <p className="mt-8 text-sm font-semibold text-[var(--text)] pt-6 border-t border-[var(--line)]">
                    {aboutPage.vision.footer}
                  </p>
                )}
              </article>
            )}
            
            {aboutPage.mission?.enabled !== false && (
              <article className="surface p-8 rounded-2xl border border-[var(--line)] relative overflow-hidden group" data-aos="fade-up" data-aos-delay="100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/20 blur-3xl group-hover:bg-neon-cyan/30 transition-colors" />
                <h2 className="text-sm font-black uppercase tracking-widest text-neon-cyan mb-4">{aboutPage.mission.title}</h2>
                <div className="text-xl leading-relaxed text-[var(--text)] font-medium">
                  <ReactMarkdown>{aboutPage.mission.description}</ReactMarkdown>
                </div>
                
                {/* Why Work With Me inside Mission column to balance layout */}
                {aboutPage.whyWorkWithMe?.enabled !== false && (
                  <div className="mt-12 pt-8 border-t border-[var(--line)]">
                    <h3 className="text-lg font-bold text-[var(--text)] mb-6">{aboutPage.whyWorkWithMe.title}</h3>
                    <div className="grid gap-3">
                      {(aboutPage.whyWorkWithMe.items || []).map(item => (
                        <div key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="shrink-0 text-[var(--accent)] mt-0.5" size={18} />
                          <span className="text-sm text-[var(--muted)]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            )}
          </div>
        </section>
      )}

      {/* Experience & Education */}
      {(aboutPage.experience?.enabled !== false || aboutPage.education?.enabled !== false) && (
        <section className="section-band">
          <div className="shell">
            <SectionHeading eyebrow="Journey" title="Education & Experience" align="center" />
            
            <div className="mt-16 grid gap-12 lg:grid-cols-2">
              {/* Experience */}
              {aboutPage.experience?.enabled !== false && (
                <div>
                  <h3 className="text-2xl font-black text-[var(--text)] flex items-center gap-3 mb-8">
                    <Briefcase className="text-neon-purple" size={28} />
                    {aboutPage.experience.title}
                  </h3>
                  <div className="space-y-6">
                    {(aboutPage.experience.items || []).map((exp, i) => (
                      <div key={i} className="surface p-6 rounded-2xl border border-[var(--line)] relative" data-aos="fade-up" data-aos-delay={i * 100}>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-neon-purple rounded-r-md" />
                        <h4 className="text-xl font-bold text-[var(--text)]">{exp.role}</h4>
                        <p className="text-[var(--accent)] font-semibold text-sm mt-1 mb-4">{exp.company}</p>
                        <ul className="space-y-2">
                          {(exp.bullets || []).map((bullet, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                              <span className="text-neon-purple mt-1">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Education */}
              {aboutPage.education?.enabled !== false && (
                <div>
                  <h3 className="text-2xl font-black text-[var(--text)] flex items-center gap-3 mb-8">
                    <GraduationCap className="text-neon-cyan" size={28} />
                    {aboutPage.education.title}
                  </h3>
                  <div className="space-y-6">
                    {(aboutPage.education.items || []).map((edu, i) => (
                      <div key={i} className="surface p-6 rounded-2xl border border-[var(--line)] relative" data-aos="fade-up" data-aos-delay={i * 100}>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-neon-cyan rounded-r-md" />
                        <h4 className="text-xl font-bold text-[var(--text)]">{edu.degree}</h4>
                        <p className="text-[var(--muted)] text-sm mt-2">{edu.institution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {aboutPage.skills?.enabled !== false && (
        <section className="section-band bg-[var(--surface-2)]/30">
          <div className="shell">
            <SectionHeading eyebrow="Expertise" title={aboutPage.skills?.title || "Technical Skills"} align="center" />
            
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {(aboutPage.skills?.categories || []).map((category, i) => (
                <div key={category.name} className="surface p-6 rounded-2xl border border-[var(--line)]" data-aos="fade-up" data-aos-delay={i * 100}>
                  <h3 className="text-lg font-black text-[var(--text)] mb-6 flex items-center gap-3">
                    <Code className="text-[var(--accent)]" size={20} />
                    {category.name}
                  </h3>
                  <div className="space-y-5">
                    {(category.items || []).map(skill => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-sm font-semibold mb-2">
                          <span className="text-[var(--text)]">{skill.name}</span>
                          <span className="text-[var(--muted)]">{skill.percentage}%</span>
                        </div>
                        <div className="h-2 w-full bg-[var(--surface-3)] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack Marquee / Grid */}
      {aboutPage.techStack?.enabled !== false && (
        <section className="py-12 border-y border-[var(--line)] overflow-hidden bg-[var(--surface)]">
          <div className="shell text-center mb-8">
            <p className="text-sm font-bold uppercase tracking-widest text-[var(--muted)]">{aboutPage.techStack?.title}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto px-4">
            {(aboutPage.techStack?.content || '').split('•').map(item => item.trim()).filter(Boolean).map((tech, i) => (
              <span key={i} className="px-4 py-2 rounded-full border border-[var(--line)] bg-[var(--surface-2)] text-sm font-semibold text-[var(--text)] hover:border-neon-cyan transition-colors" data-aos="zoom-in" data-aos-delay={(i % 10) * 50}>
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Footer CTA */}
      {aboutPage.footerCTA?.enabled !== false && (
        <section className="section-band text-center">
          <div className="shell max-w-3xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-black text-[var(--text)] mb-6">{aboutPage.footerCTA?.title}</h2>
            <div className="text-lg text-[var(--muted)] mb-10 prose prose-invert mx-auto">
              <ReactMarkdown>{aboutPage.footerCTA?.description}</ReactMarkdown>
            </div>
            <Link to="/contact" className="btn-primary text-lg px-8 py-4">
              Start a Project
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

export default About;
