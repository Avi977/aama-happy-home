import React from 'react';
import { useAuth } from '@/hooks/auth-context';
import { GoogleLogin } from '@react-oauth/google';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { user, setUser, logout } = useAuth();
  const location = useLocation();
  const notOnHome = location.pathname !== '/';
  return (
    <header className="w-full flex justify-between items-center px-8 py-4 bg-white/80 shadow-sm fixed top-0 left-0 z-50">
      <div>
        {notOnHome && (
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors font-semibold"
          >
            ← Back to Home
          </Link>
        )}
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-foreground">{user.name || user.email}</span>
            <button onClick={logout} className="text-sm underline text-primary">Logout</button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={credentialResponse => {
              const decoded = credentialResponse.credential ? JSON.parse(atob(credentialResponse.credential.split('.')[1])) : null;
              setUser(decoded);
            }}
            onError={() => {
              alert('Login Failed');
            }}
            useOneTap
          />
        )}
      </div>
    </header>
  );
};

export default Header;
