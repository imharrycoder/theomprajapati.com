import { NavLink } from 'react-router-dom';
import { navLinks } from '../../data/content.js';

function MobileMenu({ isOpen, setIsOpen }) {
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
      </div>
    </div>
  );
}

export default MobileMenu;
