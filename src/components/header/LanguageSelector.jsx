import { Languages } from 'lucide-react';

const languageOptions = [
  { label: 'EN', value: 'en-US' },
  { label: 'HI', value: 'hi-IN' },
  { label: 'GU', value: 'gu-IN' },
];

function LanguageSelector({ language, setLanguage, isMobile }) {
  if (isMobile) {
    return (
      <select
        className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-2 text-xs font-bold text-[var(--text)]"
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        aria-label="Language"
        name="language"
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <label className="glass flex h-10 items-center gap-2 rounded-lg px-2">
      <Languages size={16} aria-hidden="true" />
      <span className="sr-only">Language</span>
      <select
        className="bg-transparent text-xs font-bold text-[var(--text)] outline-none"
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        aria-label="Language"
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default LanguageSelector;
