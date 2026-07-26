import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';

function AuthStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Re-check authentication status on route change
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleAuth = () => {
    if (isLoggedIn) {
      localStorage.removeItem('userToken');
      setIsLoggedIn(false);
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <button
      onClick={handleAuth}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--neon-cyan)] transition-colors"
      title={isLoggedIn ? "Logout" : "Login"}
    >
      {isLoggedIn ? (
        <>
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </>
      ) : (
        <>
          <User size={16} />
          <span className="hidden sm:inline">Login</span>
        </>
      )}
    </button>
  );
}

export default AuthStatus;
