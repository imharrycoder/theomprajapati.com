import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { apiFetch } from '../utils/api';
import { defaultSiteContent } from '../data/siteContent.js';
import SectionHeading from './SectionHeading';

function FeaturedVideos({ content = defaultSiteContent.featuredVideos }) {
  const [videos, setVideos] = useState([]);
  const glowClasses = ['neon-glow-pink', 'neon-glow-cyan', 'neon-glow-yellow'];

  useEffect(() => {
    apiFetch('/videos/featured', { suppressToast: true })
      .then(setVideos)
      .catch(() => {
        setVideos([]);
      });
  }, []);

  const socialLinks = [
    { label: content.youtubeLabel, url: content.youtubeUrl, variant: 'btn-primary pulse-neon' },
    { label: content.facebookLabel, url: content.facebookUrl, variant: 'btn-secondary' },
    { label: content.instagramLabel, url: content.instagramUrl, variant: 'btn-secondary' },
  ].filter((link) => link.label && link.url);

  return (
    <section className="section-band relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-neon-pink opacity-5 blur-[120px] rounded-[100%] pointer-events-none" />
      <div className="shell relative z-10">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          align="center"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {videos.map((video, index) => (
            <div 
              key={video.id} 
              className={`neon-card ${glowClasses[index % glowClasses.length]} group overflow-hidden`} 
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="relative block">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-80 z-10" />
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 grid place-items-center z-20">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-[rgba(255,0,85,0.2)] border-2 border-[var(--neon-pink)] text-[var(--neon-pink)] shadow-[0_0_20px_rgba(255,0,85,0.4)] backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--neon-pink)] group-hover:text-black">
                    <Play size={28} fill="currentColor" aria-hidden="true" className="ml-1" />
                  </span>
                </div>
              </a>
              <div className="p-6 relative z-20">
                <h3 className="text-xl font-black leading-tight text-[var(--text)] mb-2">{video.title}</h3>
                <p className="text-sm text-[var(--muted)] line-clamp-2">{video.description}</p>
                <div className="mt-4 pt-4 border-t border-[var(--line)]">
                  <p className="text-xs font-bold tracking-widest text-[var(--neon-cyan)] uppercase">
                    {new Date(video.publishDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {socialLinks.length ? (
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row relative z-10">
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
