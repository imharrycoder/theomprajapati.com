import { Link } from 'react-router-dom';
import { ArrowLeft, SearchX } from 'lucide-react';

function NotFound() {
  return (
    <section className="section-band">
      <div className="shell">
        <div className="surface mx-auto max-w-2xl rounded-lg p-8 text-center">
          <SearchX className="mx-auto text-[var(--accent)]" size={54} aria-hidden="true" />
          <h1 className="mt-5 text-4xl font-black text-[var(--text)]">Page not found</h1>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            The page you opened is not part of the current public route map.
          </p>
          <Link className="btn-primary mt-6" to="/">
            <ArrowLeft size={17} aria-hidden="true" />
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
