import { Moon, Sun } from 'lucide-react';

function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      className="icon-button focus-ring"
      type="button"
      onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}

export default ThemeToggle;
