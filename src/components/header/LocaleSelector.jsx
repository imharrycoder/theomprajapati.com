import { Languages } from 'lucide-react';

const localeOptions = [
  { label: 'English (US)', value: 'en-US' },
  { label: 'Hindi (India)', value: 'hi-IN' },
  { label: 'Gujarati (India)', value: 'gu-IN' },
  { label: 'Chinese (China)', value: 'zh-CN' },
];

function LocaleSelector({ locale, setLocale, isMobile }) {
  if (isMobile) {
    return (
      <select
        className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-2 text-xs font-bold text-[var(--text)]"
        value={locale}
        onChange={(event) => setLocale(event.target.value)}
        aria-label="Language & Region"
        name="locale"
      >
        {localeOptions.map((option) => (
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
      <span className="sr-only">Language & Region</span>
      <select
        className="bg-transparent text-xs font-bold text-[var(--text)] outline-none"
        value={locale}
        onChange={(event) => setLocale(event.target.value)}
        aria-label="Language & Region"
      >
        {localeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default LocaleSelector;
