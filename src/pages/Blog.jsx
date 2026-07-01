import { useEffect, useMemo, useState } from 'react';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import BlogCard from '../components/BlogCard.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const accessTypes = ['All', 'Free', 'Premium'];
  const [type, setType] = useState('All');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/blogPosts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const blogCategories = useMemo(() => ['All', ...Array.from(new Set(posts.map((post) => post.category)))], [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesSearch =
        !normalizedQuery ||
        [post.title, post.excerpt, post.category, post.tags.join(' ')]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesCategory = category === 'All' || post.category === category;
      const matchesType = type === 'All' || (type === 'Premium' ? post.premium : !post.premium);

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [posts, category, query, type]);

  return (
    <section className="section-band">
      <div className="shell">
        <SectionHeading
          eyebrow="Blog"
          title="Searchable ideas for builders and learners."
          description="Filter practical notes about frontend, backend, CMS, product planning, deployment, and modern UI systems."
        />

        <div className="surface mt-10 rounded-lg p-4" data-aos="fade-up">
          <div className="grid gap-3 lg:grid-cols-[1fr_220px_180px]">
            <label className="relative">
              <span className="sr-only">Search blog posts</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={19} aria-hidden="true" />
              <input
                className="h-12 w-full rounded-lg border border-[var(--line)] bg-[var(--surface)] pl-10 pr-3 text-sm font-semibold text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, tag, or topic"
              />
            </label>

            <label className="relative">
              <span className="sr-only">Filter category</span>
              <Filter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} aria-hidden="true" />
              <select
                className="h-12 w-full appearance-none rounded-lg border border-[var(--line)] bg-[var(--surface)] pl-10 pr-3 text-sm font-bold text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {blogCategories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="relative">
              <span className="sr-only">Filter access type</span>
              <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} aria-hidden="true" />
              <select
                className="h-12 w-full appearance-none rounded-lg border border-[var(--line)] bg-[var(--surface)] pl-10 pr-3 text-sm font-bold text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                {accessTypes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-3 text-sm font-bold text-[var(--muted)]">
          <span>{filteredPosts.length} posts found</span>
          <span>Updated June 2026</span>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} featured={post.featured} />
          ))}
        </div>

        {!filteredPosts.length ? (
          <div className="surface mt-8 rounded-lg p-8 text-center">
            <p className="text-lg font-black text-[var(--text)]">No posts matched your filters.</p>
            <p className="mt-2 text-sm text-[var(--muted)]">Try a broader topic or switch the category back to All.</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Blog;
