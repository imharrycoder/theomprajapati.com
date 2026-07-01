import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Clock3, LockKeyhole, Rocket } from 'lucide-react';

function BlogCard({ post, featured = false }) {
  const Icon = typeof post.icon === 'function' ? post.icon : Rocket;

  return (
    <motion.article
      className={`surface group flex h-full flex-col overflow-hidden rounded-lg ${featured ? 'md:grid md:grid-cols-[0.82fr_1.18fr]' : ''}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      data-aos="fade-up"
    >
      <div className="tech-grid relative min-h-[190px] border-b border-[var(--line)] bg-[var(--surface-2)] p-5 md:border-b-0 md:border-r">
        <div className="flex items-start justify-between gap-3">
          <span className="tag">{post.category}</span>
          {post.premium ? (
            <span className="tag text-[var(--accent-3)]">
              <LockKeyhole size={14} aria-hidden="true" />
              Premium
            </span>
          ) : null}
        </div>
        <div className="absolute bottom-5 left-5 grid h-16 w-16 place-items-center rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--accent)] shadow-glow">
          <Icon size={30} aria-hidden="true" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex flex-wrap gap-3 text-xs font-bold text-[var(--muted)]">
          <span className="inline-flex items-center gap-1">
            <CalendarDays size={14} aria-hidden="true" />
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock3 size={14} aria-hidden="true" />
            {post.readTime}
          </span>
        </div>
        <h3 className="text-xl font-black leading-tight text-[var(--text)]">{post.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-[var(--muted)]">{post.excerpt}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <Link
          className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[var(--accent)]"
          to={`/blog/${post.slug}`}
        >
          Read article
          <ArrowRight className="transition group-hover:translate-x-1" size={17} aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}

export default BlogCard;
