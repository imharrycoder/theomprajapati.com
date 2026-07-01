import { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoMark from '../../assets/theom-logo.png';
import { navLinks } from '../data/content.js';
import ThemeToggle from './header/ThemeToggle.jsx';
import LanguageSelector from './header/LanguageSelector.jsx';
import CountrySelector from './header/CountrySelector.jsx';
import DateTime from './header/DateTime.jsx';
import MobileMenu from './header/MobileMenu.jsx';

function Header() {
  const [time, setTime] = useState(new Date());
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en-US');
  const [country, setCountry] = useState(() => localStorage.getItem('country') || 'IN');
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
    document.documentElement.lang = language.split('-')[0];
    localStorage.setItem('language', language);
    localStorage.setItem('country', country);
  }, [language, country]);

  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat(language, {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }).format(time),
    [language, time],
  );

  const formattedTime = useMemo(
    () =>
      new Intl.DateTimeFormat(language, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(time),
    [language, time],
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

        <div className="hidden items-center gap-2 xl:flex">
          <DateTime formattedDate={formattedDate} formattedTime={formattedTime} />
          <LanguageSelector language={language} setLanguage={setLanguage} />
          <CountrySelector country={country} setCountry={setCountry} />
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>

        <button
          className="icon-button focus-ring xl:hidden"
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-label="Toggle menu"
          title="Toggle menu"
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        language={language}
        setLanguage={setLanguage}
        country={country}
        setCountry={setCountry}
        theme={theme}
        setTheme={setTheme}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
      />
    </header>
  );
}

export default Header;
