import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, Settings } from 'lucide-react';

function AuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Re-check authentication status on route change
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    navigate('/');
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--neon-cyan)] transition-colors"
          title="Settings"
        >
          <Settings size={16} />
          <span className="hidden sm:inline">Settings</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-red-400 transition-colors"
          title="Logout"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => navigate('/login')}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--neon-cyan)] transition-colors"
      title="Login"
    >
      <User size={16} />
      <span className="hidden sm:inline">Login</span>
    </button>
  );
}

export default AuthStatus;
