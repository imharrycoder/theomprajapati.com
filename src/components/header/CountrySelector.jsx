import { Globe2 } from 'lucide-react';

const countryOptions = [
  { label: 'India', value: 'IN' },
  { label: 'USA', value: 'US' },
  { label: 'UK', value: 'GB' },
];

function CountrySelector({ country, setCountry, isMobile }) {
  if (isMobile) {
    return (
      <select
        className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-2 text-xs font-bold text-[var(--text)]"
        value={country}
        onChange={(event) => setCountry(event.target.value)}
        aria-label="Country"
        name="country"
      >
        {countryOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <label className="glass flex h-10 items-center gap-2 rounded-lg px-2">
      <Globe2 size={16} aria-hidden="true" />
      <span className="sr-only">Country</span>
      <select
        className="bg-transparent text-xs font-bold text-[var(--text)] outline-none"
        value={country}
        onChange={(event) => setCountry(event.target.value)}
        aria-label="Country"
      >
        {countryOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default CountrySelector;
