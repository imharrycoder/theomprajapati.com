import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Clock3, LockKeyhole, Share2, UserRound, Rocket, Code2, Search, Database, Globe2, LayoutDashboard } from 'lucide-react';
import BlogCard from '../components/BlogCard.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { blogPosts as staticBlogPosts, getBlogBySlug, getRelatedPosts } from '../data/content.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const iconMap = {
  'Creator Platform': Rocket,
  'React': Code2,
  'Search': Search,
  'Node.js': Database,
  'Hosting': Globe2,
  'Dashboard': LayoutDashboard,
  'default': Code2
};

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        if (API_BASE_URL) {
          const response = await fetch(`${API_BASE_URL}/blogPosts?slug=${slug}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          if (data.length > 0) {
            setPost(data[0]);
            return;
          }
        }

        const fallbackPost = getBlogBySlug(slug);
        setPost(fallbackPost || null);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setPost(getBlogBySlug(slug) || null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    setRelatedPosts(getRelatedPosts(post.slug));
  }, [post]);

  if (loading) {
    // You can replace this with a proper loading spinner component
    return <div>Loading...</div>;
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const Icon = iconMap[post.tags[0]] || iconMap.default;


  return (
    <>
      <article className="section-band">
        <div className="shell">
          <Link className="mb-8 inline-flex items-center gap-2 text-sm font-black text-[var(--accent)]" to="/blog">
            <ArrowLeft size={17} aria-hidden="true" />
            Back to blog
          </Link>

          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="surface h-fit rounded-lg p-5" data-aos="fade-right">
              <div className="tech-grid grid aspect-square place-items-center rounded-lg border border-[var(--line)] bg-[var(--surface-2)]">
                <Icon className="text-[var(--accent)]" size={64} aria-hidden="true" />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="tag">{post.category}</span>
                {post.premium ? (
                  <span className="tag text-[var(--accent-3)]">
                    <LockKeyhole size={14} aria-hidden="true" />
                    Premium
                  </span>
                ) : null}
              </div>
              <div className="mt-6 grid gap-3 text-sm font-bold text-[var(--muted)]">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={16} aria-hidden="true" />
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock3 size={16} aria-hidden="true" />
                  {post.readTime}
                </span>
                <span className="inline-flex items-center gap-2">
                  <UserRound size={16} aria-hidden="true" />
                  {post.author}
                </span>
              </div>
              <button className="btn-secondary mt-6 w-full" type="button">
                <Share2 size={17} aria-hidden="true" />
                Share Post
              </button>
            </aside>

            <div data-aos="fade-left">
              <div className="max-w-4xl">
                <p className="text-sm font-black uppercase text-[var(--accent)]">Single blog post</p>
                <h1 className="mt-3 text-4xl font-black leading-tight text-[var(--text)] md:text-6xl">{post.title}</h1>
                <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{post.excerpt}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10 grid gap-6">
                {post.content.map((section) => (
                  <section key={section.heading} className="border-l-2 border-[var(--accent)] pl-5">
                    <h2 className="text-2xl font-black text-[var(--text)]">{section.heading}</h2>
                    <p className="mt-3 text-base leading-8 text-[var(--muted)]">{section.body}</p>
                  </section>
                ))}
              </div>

              {post.premium ? (
                <div className="surface mt-10 rounded-lg p-6">
                  <span className="tag text-[var(--accent-3)]">
                    <LockKeyhole size={14} aria-hidden="true" />
                    Premium preview
                  </span>
                  <h2 className="mt-4 text-2xl font-black text-[var(--text)]">Future subscriber gate ready</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    Subscriber-only deep dives can unlock here later when account access, payments, and secure content delivery are connected.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </article>

      <section className="section-band border-t border-[var(--line)] bg-[var(--surface-2)]/55">
        <div className="shell">
          <SectionHeading eyebrow="Read next" title="Related posts for your next build session." />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {relatedPosts.map((item) => (
              <BlogCard key={item.slug} post={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogPost;
