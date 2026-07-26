import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Play, Sparkles } from 'lucide-react';
import heroImage from '../../assets/creator-platform-hero.png';
import { defaultSiteContent } from '../data/siteContent.js';
import { HERO_SLIDER_INTERVAL_MS } from '../constants/animation.js';
import Typewriter from './Typewriter.jsx';

function HeroSlider({ content = defaultSiteContent.hero }) {
  const slides = content.slides?.length ? content.slides : defaultSiteContent.hero.slides;
  const [active, setActive] = useState(0);
  const slide = slides[active] || slides[0];
  const phrases = Array.isArray(slide.phrase)
    ? slide.phrase
    : String(slide.phrase || 'ideas')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
  const imageUrl = content.imageUrl || heroImage;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % slides.length);
    }, HERO_SLIDER_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    setActive(0);
  }, [slides]);

  const move = (direction) => {
    setActive((index) => (index + direction + slides.length) % slides.length);
  };

  return (
    <section className="relative overflow-hidden border-b border-[var(--line)]">
      <div className="shell grid min-h-[calc(100vh-76px)] items-center gap-10 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:py-8">
        <div className="max-w-3xl">
          <div className="tag mb-5">
            <Sparkles size={16} aria-hidden="true" />
            <span>{slide.eyebrow}</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.42, ease: 'easeOut' }}
            >
              <h1 className="text-4xl font-black leading-[1.04] text-[var(--text)] md:text-6xl">
                {slide.title}
              </h1>
              <p className="mt-5 text-2xl font-black text-[var(--text)] md:text-4xl">
                Build for <Typewriter words={phrases} />
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">{slide.body}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="btn-primary focus-ring" to={slide.ctaPath}>
              {slide.cta}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="btn-secondary focus-ring" to="/about">
              View Skill Set
            </Link>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-[auto_1fr] gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-lg border border-[var(--line)] bg-[var(--surface)] text-2xl font-black text-[var(--accent-3)]">
              {slide.stat}
            </div>
            <div>
              <p className="text-sm font-black uppercase text-[var(--text)]">{slide.statLabel}</p>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                Performance, ownership, and responsive design are treated as product features from the first screen.
              </p>
            </div>
          </div>
        </div>

        <div className="relative" data-aos="fade-left">
          <div className="scan-line overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--surface-2)] shadow-glow">
            <img
              src={imageUrl}
              alt="Futuristic creator platform dashboard with content, video, analytics, and product modules"
              className="aspect-[16/10] h-full w-full object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-center gap-3">
            <button className="icon-button focus-ring" type="button" onClick={() => move(-1)} aria-label="Previous slide">
              <ChevronLeft size={19} aria-hidden="true" />
            </button>
            <div className="flex justify-center gap-2">
              {slides.map((item, index) => (
                <button
                  key={item.eyebrow}
                  className={`h-2 rounded-full transition-all ${index === active ? 'w-8 bg-[var(--accent)]' : 'w-2 bg-[var(--surface-3)]'}`}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button className="icon-button focus-ring" type="button" onClick={() => move(1)} aria-label="Next slide">
              <ChevronRight size={19} aria-hidden="true" />
            </button>
          </div>
          <div className="absolute bottom-8 left-5 hidden rounded-lg border border-[var(--line)] bg-[var(--surface)]/90 p-4 shadow-warm backdrop-blur md:block">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-[var(--surface-2)] text-[var(--accent-3)]">
                <Play size={19} fill="currentColor" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-black uppercase text-[var(--muted)]">Latest module</p>
                <p className="text-sm font-black text-[var(--text)]">Video + Blog Hub</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSlider;
