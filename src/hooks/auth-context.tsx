import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email?: string;
  picture?: string;
  [key: string]: unknown;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  // Update localStorage whenever user changes
  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  };

  const logout = () => setUser(null);
  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
