import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Clock3, LockKeyhole, Rocket, Cpu } from 'lucide-react';

// Cycle through neon glow colors based on title length or random (using a hash for consistency)
const getGlowClass = (str) => {
  const glows = ['neon-glow-cyan', 'neon-glow-purple', 'neon-glow-pink', 'neon-glow-lime'];
  const hash = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return glows[hash % glows.length];
};

function BlogCard({ post, featured = false }) {
  const Icon = typeof post.icon === 'function' ? post.icon : Rocket;
  const glowClass = getGlowClass(post.title);

  return (
    <motion.article
      className={`neon-card ${glowClass} flex h-full flex-col overflow-hidden group ${featured ? 'md:grid md:grid-cols-[0.82fr_1.18fr]' : ''}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      data-aos="fade-up"
    >
      <div className="tech-grid relative min-h-[220px] border-b border-[rgba(0,243,255,0.1)] bg-[var(--surface)] p-6 md:border-b-0 md:border-r">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[rgba(0,243,255,0.05)] pointer-events-none" />
        
        <div className="flex items-start justify-between gap-3 relative z-10">
          <span className="tag border-[var(--neon-cyan)] text-[var(--neon-cyan)] bg-[rgba(0,243,255,0.1)]">{post.category}</span>
          {post.premium ? (
            <span className="tag border-[var(--neon-pink)] text-[var(--neon-pink)] bg-[rgba(255,0,85,0.1)]">
              <LockKeyhole size={14} aria-hidden="true" />
              Premium
            </span>
          ) : null}
        </div>
        
        <div className="absolute bottom-6 left-6 grid h-20 w-20 place-items-center rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-transform duration-300 group-hover:scale-110">
          <Icon size={36} aria-hidden="true" />
        </div>
        
        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--neon-cyan)] opacity-50" />
      </div>

      <div className="flex flex-1 flex-col p-6 bg-[var(--surface)]">
        <div className="mb-5 flex flex-wrap gap-4 text-xs font-bold text-[var(--muted)] uppercase tracking-wider">
          <span className="inline-flex items-center gap-1.5 text-[var(--neon-cyan)]">
            <CalendarDays size={14} aria-hidden="true" />
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[var(--neon-purple)]">
            <Clock3 size={14} aria-hidden="true" />
            {post.readTime}
          </span>
        </div>
        
        <h3 className="text-xl font-black leading-tight text-[var(--text)] mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--neon-cyan)] group-hover:to-[var(--neon-purple)] transition-all">
          {post.title}
        </h3>
        
        <p className="flex-1 text-sm leading-relaxed text-[var(--muted)] mb-6">{post.excerpt}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span key={tag} className="tag bg-[var(--surface-3)] border-[var(--line)] text-xs text-[var(--text)]">
              <Cpu size={12} className="mr-1 inline text-[var(--neon-cyan)]" />
              {tag}
            </span>
          ))}
        </div>
        
        <Link
          className="inline-flex items-center gap-2 text-sm font-black tracking-widest uppercase text-[var(--text)] hover:text-[var(--neon-cyan)] transition-colors mt-auto"
          to={`/blog/${post.slug}`}
        >
          READ_ARTICLE
          <ArrowRight className="transition group-hover:translate-x-2" size={17} aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}

export default BlogCard;
