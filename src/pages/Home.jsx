import { useEffect, useState } from 'react';
import HeroSlider from '../components/HeroSlider.jsx';
import FeaturedVideos from '../components/FeaturedVideos.jsx';
import { apiFetch } from '../utils/api.js';
import { blogPosts as staticBlogPosts, services as staticServices } from '../data/content.js';
import { defaultSiteContent } from '../data/siteContent.js';
import { mergeSiteContent } from '../utils/mergeSiteContent.js';

// Home page section components — each in its own file
import ServicesSection from '../features/home/sections/ServicesSection.jsx';
import TechnologiesSection from '../features/home/sections/TechnologiesSection.jsx';
import PortfolioSection from '../features/home/sections/PortfolioSection.jsx';
import ProcessSection from '../features/home/sections/ProcessSection.jsx';
import WhyChooseUsSection from '../features/home/sections/WhyChooseUsSection.jsx';
import LatestBlogsSection from '../features/home/sections/LatestBlogsSection.jsx';
import TestimonialsSection from '../features/home/sections/TestimonialsSection.jsx';
import ConsultationCtaSection from '../features/home/sections/ConsultationCtaSection.jsx';
import FaqSection from '../features/home/sections/FaqSection.jsx';

const FEATURED_POSTS_COUNT = 3;

function isEnabled(section) {
  return section?.enabled !== false;
}

function Home() {
  const [siteContent, setSiteContent] = useState(defaultSiteContent);
  const [services, setServices] = useState(staticServices);
  const [posts, setPosts] = useState(staticBlogPosts);

  useEffect(() => {
    apiFetch('/site-content', { suppressToast: true })
      .then((data) => setSiteContent(mergeSiteContent(defaultSiteContent, data)))
      .catch(() => setSiteContent(defaultSiteContent));

    apiFetch('/services', { suppressToast: true })
      .then((data) => {
        if (Array.isArray(data) && data.length) setServices(data);
      })
      .catch(() => setServices(staticServices));

    apiFetch('/blogPosts', { suppressToast: true })
      .then((data) => {
        if (Array.isArray(data) && data.length) setPosts(data);
      })
      .catch(() => setPosts(staticBlogPosts));
  }, []);

  const featuredPosts = posts.slice(0, FEATURED_POSTS_COUNT);

  return (
    <>
      {isEnabled(siteContent.hero) ? <HeroSlider content={siteContent.hero} /> : null}
      {isEnabled(siteContent.services) ? <ServicesSection section={siteContent.services} services={services} /> : null}
      {isEnabled(siteContent.technologies) ? <TechnologiesSection section={siteContent.technologies} /> : null}
      {isEnabled(siteContent.portfolio) ? <PortfolioSection section={siteContent.portfolio} /> : null}
      {isEnabled(siteContent.process) ? <ProcessSection section={siteContent.process} /> : null}
      {isEnabled(siteContent.whyChoose) ? <WhyChooseUsSection section={siteContent.whyChoose} /> : null}
      {isEnabled(siteContent.featuredVideos) ? <FeaturedVideos content={siteContent.featuredVideos} /> : null}
      {isEnabled(siteContent.latestBlogs) ? <LatestBlogsSection section={siteContent.latestBlogs} posts={featuredPosts} /> : null}
      {isEnabled(siteContent.testimonials) ? <TestimonialsSection section={siteContent.testimonials} /> : null}
      {isEnabled(siteContent.consultation) ? <ConsultationCtaSection section={siteContent.consultation} /> : null}
      {isEnabled(siteContent.faq) ? <FaqSection section={siteContent.faq} /> : null}
    </>
  );
}

export default Home;
