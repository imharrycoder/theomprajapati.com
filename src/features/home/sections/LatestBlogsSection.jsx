import { ArrowRight } from 'lucide-react';
import BlogCard from '../../../components/BlogCard.jsx';
import SectionHeading from '../../../components/SectionHeading.jsx';
import SmartLink from '../../../components/SmartLink.jsx';

const LatestBlogsSection = ({ section, posts }) => (
  <section className="section-band border-y border-[var(--line)] bg-[var(--surface-2)]/55">
    <div className="shell">
      <SectionHeading eyebrow={section.eyebrow} title={section.title} description={section.description} />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <SmartLink className="btn-secondary" to={section.ctaPath}>
          {section.cta}
          <ArrowRight size={17} aria-hidden="true" />
        </SmartLink>
      </div>
    </div>
  </section>
);

export default LatestBlogsSection;
