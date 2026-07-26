import { Link } from 'react-router-dom';

/**
 * Renders either a React Router Link (internal path) or an anchor tag
 * (external URL) based on the provided `to` prop.
 * Returns null if `to` is falsy.
 */
function SmartLink({ to, className, children }) {
  if (!to) return null;

  if (/^https?:\/\//i.test(to)) {
    return (
      <a className={className} href={to} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}

export default SmartLink;
