import { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoMark from '../../assets/theom-logo.png';
import { navLinks } from '../data/content.js';
import ThemeToggle from './header/ThemeToggle.jsx';
import LocaleSelector from './header/LocaleSelector.jsx';
import DateTime from './header/DateTime.jsx';
import MobileMenu from './header/MobileMenu.jsx';

import AuthStatus from './header/AuthStatus.jsx';

const availableLocales = ['en-US', 'hi-IN', 'gu-IN', 'zh-CN'];

function getInitialLocale() {
  const savedLocale = localStorage.getItem('locale');
  if (savedLocale && availableLocales.includes(savedLocale)) {
    return savedLocale;
  }
  const browserLanguage = navigator.language;
  // Find a matching locale or default to 'en-US'
  return availableLocales.find((l) => l.startsWith(browserLanguage.split('-')[0])) || 'en-US';
}

function Header() {
  const [time, setTime] = useState(new Date());
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [locale, setLocale] = useState(getInitialLocale);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = locale.split('-')[0];
    localStorage.setItem('locale', locale);
  }, [locale]);

  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }).format(time),
    [locale, time],
  );

  const formattedTime = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(time),
    [locale, time],
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header)] backdrop-blur-xl">
      <div className="shell flex min-h-[76px] items-center justify-between gap-3">
        <NavLink to="/" className="flex min-w-0 items-center gap-3" onClick={() => setIsOpen(false)}>
          <img src={logoMark} alt="The Om Prajapati" className="h-11 w-11 shrink-0 rounded-lg shadow-glow" />
          <span className="min-w-0">
            <span className="block truncate text-sm font-black uppercase text-[var(--text)]">The Om Prajapati</span>
            <span className="block truncate text-xs font-semibold text-[var(--muted)]">Creator Platform</span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-bold transition ${
                  isActive
                    ? 'bg-[var(--surface-2)] text-[var(--accent)]'
                    : 'text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop controls */}
        <div className="hidden items-center gap-2 xl:flex">
          <DateTime formattedDate={formattedDate} formattedTime={formattedTime} />
          <LocaleSelector locale={locale} setLocale={setLocale} />
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <div className="h-6 w-px bg-[var(--line)] mx-1" />
          <AuthStatus />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 xl:hidden">
          <div className="hidden md:block">
            <DateTime formattedDate={formattedDate} formattedTime={formattedTime} />
          </div>
          <div className="hidden sm:block">
            <LocaleSelector locale={locale} setLocale={setLocale} />
          </div>
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <AuthStatus />
          <button
            className="icon-button focus-ring"
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            aria-label="Toggle menu"
            title="Toggle menu"
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}

export default Header;
