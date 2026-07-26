import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { apiFetch } from '../utils/api';
import { defaultSiteContent } from '../data/siteContent.js';
import SectionHeading from './SectionHeading';

function FeaturedVideos({ content = defaultSiteContent.featuredVideos }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    apiFetch('/videos/featured', { suppressToast: true })
      .then(setVideos)
      .catch(() => {
        setVideos([]);
      });
  }, []);

  const socialLinks = [
    { label: content.youtubeLabel, url: content.youtubeUrl, variant: 'btn-primary' },
    { label: content.facebookLabel, url: content.facebookUrl, variant: 'btn-secondary' },
    { label: content.instagramLabel, url: content.instagramUrl, variant: 'btn-secondary' },
  ].filter((link) => link.label && link.url);

  return (
    <section className="section-band">
      <div className="shell">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          align="center"
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {videos.map((video) => (
            <div key={video.id} className="surface group overflow-hidden rounded-lg" data-aos="fade-up">
              <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="relative block">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 grid place-items-center bg-black/30">
                  <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-white bg-white/20 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Play size={32} fill="currentColor" aria-hidden="true" />
                  </span>
                </div>
              </a>
              <div className="p-5">
                <h3 className="text-lg font-black leading-tight text-[var(--text)]">{video.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{video.description}</p>
                <p className="mt-3 text-xs font-bold text-[var(--muted)]">
                  {new Date(video.publishDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {socialLinks.length ? (
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className={link.variant}>
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default FeaturedVideos;
