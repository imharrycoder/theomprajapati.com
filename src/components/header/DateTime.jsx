import { CalendarDays } from 'lucide-react';

function DateTime({ formattedDate, formattedTime, isMobile }) {
  if (isMobile) {
    return (
      <div className="glass rounded-lg px-3 py-3 text-xs font-bold text-[var(--muted)]">
        <span className="block">{formattedDate}</span>
        <span className="mt-1 block tabular-nums text-[var(--text)]">{formattedTime}</span>
      </div>
    );
  }
  return (
    <div className="glass flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-[var(--muted)]">
      <CalendarDays size={16} aria-hidden="true" />
      <span className="whitespace-nowrap">{formattedDate}</span>
      <span className="h-4 w-px bg-[var(--line)]" aria-hidden="true" />
      <span className="tabular-nums text-[var(--text)]">{formattedTime}</span>
    </div>
  );
}

export default DateTime;
