import { Link, NavLink } from 'react-router-dom';
import { Github, Linkedin, Mail, Rocket } from 'lucide-react';
import logoMark from '../../assets/theom-logo.png';
import { navLinks } from '../data/content.js';

function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
      <div className="shell grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <img src={logoMark} alt="The Om Prajapati" className="h-11 w-11 shrink-0 rounded-lg" />
            <span>
              <span className="block text-sm font-black uppercase text-[var(--text)]">The Om Prajapati</span>
              <span className="block text-xs font-semibold text-[var(--muted)]">Blogs, videos, projects, and SaaS learning</span>
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-[var(--muted)]">
            A professional creator platform frontend for practical web development, product planning, and future subscriber-first content.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase text-[var(--text)]">Pages</h2>
          <nav className="mt-4 grid gap-3 text-sm font-bold text-[var(--muted)]" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className="hover:text-[var(--accent)]">
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase text-[var(--text)]">Connect</h2>
          <div className="mt-4 flex gap-2">
            <a className="icon-button focus-ring" href="mailto:hello@theomprajapati.com" aria-label="Email" title="Email">
              <Mail size={18} aria-hidden="true" />
            </a>
            <a className="icon-button focus-ring" href="https://github.com/" aria-label="GitHub" title="GitHub">
              <Github size={18} aria-hidden="true" />
            </a>
            <a className="icon-button focus-ring" href="https://www.linkedin.com/" aria-label="LinkedIn" title="LinkedIn">
              <Linkedin size={18} aria-hidden="true" />
            </a>
          </div>
          <Link className="btn-primary mt-5 w-full sm:w-auto" to="/contact">
            <Rocket size={17} aria-hidden="true" />
            Plan a Project
          </Link>
        </div>
      </div>
      <div className="border-t border-[var(--line)] py-5">
        <div className="shell flex flex-col gap-2 text-xs font-bold text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>Copyright 2026 The Om Prajapati. All rights reserved.</span>
          <span>Learning notes, launch plans, and product stories in one place.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
