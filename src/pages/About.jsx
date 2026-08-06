import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, GraduationCap, Briefcase, Code, LayoutTemplate } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import SectionHeading from '../components/SectionHeading.jsx';
import { defaultSiteContent } from '../data/siteContent.js';
import { apiFetch } from '../utils/api.js';

// Custom Markdown Renderer for a futuristic look instead of basic text
const MarkdownRenderer = ({ children }) => (
  <ReactMarkdown
    components={{
      p: ({ node, ...props }) => <p className="text-lg leading-relaxed text-[var(--muted)] mb-6" {...props} />,
      strong: ({ node, ...props }) => <strong className="text-[var(--text)] font-black text-glow-cyan" {...props} />,
      a: ({ node, ...props }) => <a className="text-[var(--accent-2)] hover:text-white transition-colors underline decoration-[var(--accent-2)] decoration-2 underline-offset-4" {...props} />,
      ul: ({ node, ...props }) => <ul className="space-y-3 mb-6" {...props} />,
      li: ({ node, ...props }) => (
        <li className="flex items-start gap-3 text-[var(--muted)]">
          <span className="text-[var(--accent)] mt-1.5 shadow-[0_0_10px_var(--accent)] block w-1.5 h-1.5 rounded-full shrink-0" />
          <span {...props} />
        </li>
      ),
    }}
  >
    {children}
  </ReactMarkdown>
);

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
          {/* Futuristic Background Gradients */}
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[var(--neon-cyan)] opacity-10 blur-[150px] rounded-full pointer-events-none pulse-neon" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--neon-purple)] opacity-10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="shell relative z-10 grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div data-aos="fade-right">
              <span className="tag mb-8 inline-flex items-center gap-2 border-[var(--neon-cyan)] text-[var(--neon-cyan)] shadow-[0_0_15px_rgba(59,130,246,0.2)] scan-line overflow-hidden">
                <Sparkles size={16} aria-hidden="true" />
                About Me
              </span>
              <h1 className="text-4xl font-black leading-tight text-[var(--text)] md:text-5xl lg:text-6xl mb-8 tracking-tight">
                {aboutPage.hero.title}
              </h1>
              <div className="max-w-xl">
                <MarkdownRenderer>{aboutPage.hero.description}</MarkdownRenderer>
              </div>
              <Link className="btn-primary mt-8 inline-flex items-center gap-3 text-lg px-8 py-4" to="/contact">
                Work together
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
            </div>
            
            <div className="relative" data-aos="fade-left">
              <div className="neon-card neon-glow-cyan p-8 sm:p-10">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <LayoutTemplate size={120} className="text-[var(--neon-cyan)]" />
                </div>
                <h2 className="text-2xl font-black text-[var(--text)] flex items-center gap-3 mb-8 relative z-10">
                  <span className="w-3 h-3 rounded-full bg-[var(--neon-cyan)] shadow-[0_0_10px_var(--neon-cyan)] animate-pulse" />
                  {aboutPage.services?.title || 'Services'}
                </h2>
                <div className="grid gap-4 relative z-10">
                  {(aboutPage.services?.items || []).slice(0, 6).map((item, idx) => (
                    <div 
                      key={item} 
                      className="glass flex items-center gap-4 rounded-xl p-4 transition-all duration-300 hover:bg-[var(--surface-3)] hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] group border border-[var(--line)]"
                      style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                      <CheckCircle2 className="shrink-0 text-[var(--neon-cyan)] group-hover:drop-shadow-[0_0_8px_var(--neon-cyan)] transition-all" size={22} />
                      <span className="text-base font-bold text-[var(--text)] group-hover:text-glow-cyan transition-all">{item}</span>
                    </div>
                  ))}
                  {aboutPage.services?.items?.length > 6 && (
                    <div className="text-center mt-4 text-sm font-bold text-[var(--muted)] uppercase tracking-widest">
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
        <section className="section-band relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--line)] to-transparent opacity-30 pointer-events-none" />
          <div className="shell grid gap-10 md:grid-cols-2 relative z-10">
            {aboutPage.vision?.enabled !== false && (
              <article className="neon-card neon-glow-purple p-10 group" data-aos="fade-up">
                <div className="scan-line overflow-hidden absolute inset-0 rounded-2xl opacity-50" />
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--neon-purple)] mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--neon-purple)] shadow-[0_0_10px_var(--neon-purple)] animate-pulse" />
                  {aboutPage.vision.title}
                </h2>
                <h3 className="text-3xl font-black text-[var(--text)] mb-6 leading-tight">{aboutPage.vision.heading}</h3>
                <div className="mb-10">
                  <MarkdownRenderer>{aboutPage.vision.description}</MarkdownRenderer>
                </div>
                
                <div className="grid gap-6">
                  {(aboutPage.vision.principles || []).map((p, i) => (
                    <div key={p.title} className="glass p-5 rounded-xl border border-[var(--line)] hover:border-[var(--neon-purple)]/50 transition-colors">
                      <h4 className="text-lg font-black text-[var(--text)] mb-2 flex items-center gap-3">
                        <span className="text-[var(--neon-purple)] opacity-50 text-sm">0{i + 1}</span>
                        {p.title}
                      </h4>
                      <p className="text-sm text-[var(--muted)] leading-relaxed">{p.description}</p>
                    </div>
                  ))}
                </div>
                
                {aboutPage.vision.footer && (
                  <p className="mt-8 text-sm font-bold text-[var(--text)] pt-6 border-t border-[var(--line)]">
                    {aboutPage.vision.footer}
                  </p>
                )}
              </article>
            )}
            
            {aboutPage.mission?.enabled !== false && (
              <article className="neon-card neon-glow-cyan p-10 group flex flex-col" data-aos="fade-up" data-aos-delay="100">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--neon-cyan)] mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--neon-cyan)] shadow-[0_0_10px_var(--neon-cyan)] animate-pulse" />
                  {aboutPage.mission.title}
                </h2>
                <div className="text-2xl leading-relaxed text-[var(--text)] font-medium mb-12">
                  <MarkdownRenderer>{aboutPage.mission.description}</MarkdownRenderer>
                </div>
                
                {/* Why Work With Me inside Mission column to balance layout */}
                {aboutPage.whyWorkWithMe?.enabled !== false && (
                  <div className="mt-auto pt-8 border-t border-[var(--line)] relative">
                    <div className="absolute -top-4 right-0 text-[var(--line)] opacity-20 transform rotate-12">
                      <Sparkles size={80} />
                    </div>
                    <h3 className="text-xl font-black text-[var(--text)] mb-8">{aboutPage.whyWorkWithMe.title}</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {(aboutPage.whyWorkWithMe.items || []).map(item => (
                        <div key={item} className="flex items-start gap-3 group/item">
                          <CheckCircle2 className="shrink-0 text-[var(--neon-cyan)] mt-0.5 opacity-70 group-hover/item:opacity-100 group-hover/item:drop-shadow-[0_0_8px_var(--neon-cyan)] transition-all" size={20} />
                          <span className="text-sm font-semibold text-[var(--muted)] group-hover/item:text-[var(--text)] transition-colors">{item}</span>
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
        <section className="section-band border-y border-[var(--line)] bg-gradient-to-b from-transparent to-[var(--surface-2)]/50">
          <div className="shell">
            <SectionHeading eyebrow="Journey" title="Education & Experience" align="center" />
            
            <div className="mt-20 grid gap-16 lg:grid-cols-2">
              {/* Experience */}
              {aboutPage.experience?.enabled !== false && (
                <div>
                  <h3 className="text-3xl font-black text-[var(--text)] flex items-center gap-4 mb-10">
                    <span className="p-3 bg-[var(--surface-3)] rounded-xl text-[var(--neon-pink)] shadow-[0_0_20px_rgba(255,140,0,0.15)]">
                      <Briefcase size={28} />
                    </span>
                    {aboutPage.experience.title}
                  </h3>
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[22px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[var(--neon-pink)] before:via-[var(--neon-purple)] before:to-transparent">
                    {(aboutPage.experience.items || []).map((exp, i) => (
                      <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active" data-aos="fade-up" data-aos-delay={i * 100}>
                        <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-[var(--bg)] bg-[var(--neon-pink)] text-white shadow-[0_0_15px_rgba(255,140,0,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                          <Briefcase size={18} />
                        </div>
                        <div className="neon-card neon-glow-pink p-6 w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] hover:-translate-y-1">
                          <h4 className="text-xl font-black text-[var(--text)]">{exp.role}</h4>
                          <p className="text-[var(--neon-pink)] font-bold text-sm mt-1 mb-4 uppercase tracking-widest">{exp.company}</p>
                          <ul className="space-y-3">
                            {(exp.bullets || []).map((bullet, j) => (
                              <li key={j} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                                <span className="text-[var(--neon-pink)] mt-1.5 shadow-[0_0_5px_var(--neon-pink)] block w-1.5 h-1.5 rounded-full shrink-0" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Education */}
              {aboutPage.education?.enabled !== false && (
                <div>
                  <h3 className="text-3xl font-black text-[var(--text)] flex items-center gap-4 mb-10">
                    <span className="p-3 bg-[var(--surface-3)] rounded-xl text-[var(--neon-lime)] shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                      <GraduationCap size={28} />
                    </span>
                    {aboutPage.education.title}
                  </h3>
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[22px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[var(--neon-lime)] before:to-transparent">
                    {(aboutPage.education.items || []).map((edu, i) => (
                      <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active" data-aos="fade-up" data-aos-delay={i * 100}>
                        <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-[var(--bg)] bg-[var(--neon-lime)] text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                          <GraduationCap size={18} />
                        </div>
                        <div className="neon-card neon-glow-lime p-6 w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] hover:-translate-y-1">
                          <h4 className="text-xl font-black text-[var(--text)] leading-tight">{edu.degree}</h4>
                          <p className="text-[var(--muted)] font-semibold text-sm mt-3 pt-3 border-t border-[var(--line)]">{edu.institution}</p>
                        </div>
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
        <section className="section-band overflow-hidden">
          <div className="shell">
            <SectionHeading eyebrow="Expertise" title={aboutPage.skills?.title || "Technical Skills"} align="center" />
            
            <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {(aboutPage.skills?.categories || []).map((category, i) => {
                // Cycle through neon glow classes for variety
                const glowClasses = ['neon-glow-cyan', 'neon-glow-purple', 'neon-glow-pink', 'neon-glow-lime', 'neon-glow-yellow'];
                const textGlow = ['text-glow-cyan', '', 'text-glow-pink', '', ''];
                const glowClass = glowClasses[i % glowClasses.length];
                const textClass = textGlow[i % textGlow.length];
                const colorVars = ['var(--neon-cyan)', 'var(--neon-purple)', 'var(--neon-pink)', 'var(--neon-lime)', 'var(--neon-yellow)'];
                const colorVar = colorVars[i % colorVars.length];

                return (
                  <div key={category.name} className={`neon-card ${glowClass} p-8`} data-aos="fade-up" data-aos-delay={(i % 3) * 100}>
                    <h3 className={`text-xl font-black text-[var(--text)] mb-8 flex items-center gap-3 ${textClass}`}>
                      <span className="p-2 bg-[var(--surface-2)] rounded-lg shadow-inner border border-[var(--line)]">
                        <Code style={{ color: colorVar }} size={22} />
                      </span>
                      {category.name}
                    </h3>
                    <div className="space-y-6">
                      {(category.items || []).map((skill, j) => (
                        <div key={skill.name} className="group/skill">
                          <div className="flex justify-between text-sm font-bold mb-2">
                            <span className="text-[var(--text)] group-hover/skill:text-white transition-colors">{skill.name}</span>
                            <span className="text-[var(--muted)] group-hover/skill:text-white transition-colors">{skill.percentage}%</span>
                          </div>
                          <div className="h-2 w-full bg-[var(--surface-3)] rounded-full overflow-hidden shadow-inner">
                            <div 
                              className="h-full rounded-full transition-all duration-[1.5s] ease-out relative overflow-hidden"
                              style={{ 
                                width: `${skill.percentage}%`, 
                                background: `linear-gradient(90deg, ${colorVar}, transparent)`,
                                backgroundColor: colorVar
                              }}
                            >
                              <div className="absolute inset-0 bg-white/30 scan-line" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack Marquee / Grid */}
      {aboutPage.techStack?.enabled !== false && (
        <section className="py-16 border-y border-[var(--line)] bg-[var(--surface)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[var(--line)] opacity-[0.03] scan-line" />
          <div className="shell text-center mb-10 relative z-10">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--muted)] mb-2 flex justify-center items-center gap-3">
              <span className="w-8 h-px bg-[var(--line)]" />
              {aboutPage.techStack?.title}
              <span className="w-8 h-px bg-[var(--line)]" />
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto px-4 relative z-10">
            {(aboutPage.techStack?.content || '').split('•').map(item => item.trim()).filter(Boolean).map((tech, i) => (
              <span 
                key={i} 
                className="px-6 py-3 rounded-xl border border-[var(--line)] bg-[var(--surface-2)] text-sm font-bold text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--accent)] hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all cursor-default transform hover:-translate-y-1" 
                data-aos="zoom-in" 
                data-aos-delay={(i % 12) * 50}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Footer CTA */}
      {aboutPage.footerCTA?.enabled !== false && (
        <section className="section-band text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--neon-purple)]/5 to-transparent pointer-events-none" />
          <div className="shell max-w-4xl mx-auto relative z-10" data-aos="fade-up">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-[var(--surface-2)] border border-[var(--line)] mb-8 shadow-[0_0_30px_rgba(245,158,11,0.15)] pulse-neon">
              <Sparkles className="text-[var(--neon-purple)]" size={32} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[var(--text)] mb-8 tracking-tight">{aboutPage.footerCTA?.title}</h2>
            <div className="text-xl text-[var(--muted)] mb-12 max-w-3xl mx-auto">
              <MarkdownRenderer>{aboutPage.footerCTA?.description}</MarkdownRenderer>
            </div>
            <Link to="/contact" className="btn-primary text-xl px-12 py-5 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_50px_rgba(245,158,11,0.5)]">
              Start a Project
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

export default About;
