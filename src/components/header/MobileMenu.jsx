import { NavLink } from 'react-router-dom';
import { navLinks } from '../../data/content.js';
import LanguageSelector from './LanguageSelector.jsx';
import CountrySelector from './CountrySelector.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import DateTime from './DateTime.jsx';

function MobileMenu({
  isOpen,
  setIsOpen,
  language,
  setLanguage,
  country,
  setCountry,
  theme,
  setTheme,
  formattedDate,
  formattedTime,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="border-t border-[var(--line)] bg-[var(--header)] xl:hidden">
      <div className="shell grid gap-3 py-4">
        <nav className="grid gap-1" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-3 text-sm font-bold ${
                  isActive ? 'bg-[var(--surface-2)] text-[var(--accent)]' : 'text-[var(--muted)]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="grid gap-2 sm:grid-cols-2">
          <DateTime formattedDate={formattedDate} formattedTime={formattedTime} isMobile />
          <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
            <LanguageSelector language={language} setLanguage={setLanguage} isMobile />
            <CountrySelector country={country} setCountry={setCountry} isMobile />
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
