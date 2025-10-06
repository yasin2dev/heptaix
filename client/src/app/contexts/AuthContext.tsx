'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import type { AuthContextType } from '@client/app/types';
import { TokenUser } from '@server/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<TokenUser | undefined>(undefined);

  useEffect(() => {
    const token = localStorage.getItem('JWT_TOKEN');
    const user = localStorage.getItem('USER');
    if (token && user) {
      setIsAuthenticated(true);
      setUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = (token: string, user: string) => {
    localStorage.setItem('JWT_TOKEN', token);
    localStorage.setItem('USER', user);
    setIsAuthenticated(true);
    window.location.href = '/';
  };

  const logout = () => {
    localStorage.removeItem('JWT_TOKEN');
    localStorage.removeItem('USER');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  const checkAuth = () => {
    setInterval(() => {
      const token = localStorage.getItem('JWT_TOKEN');
      const user = localStorage.getItem('USER');
      if (token && user) {
        return true;
      } else {
        // @TODO redirect to unauthorized page
        return window.open('/login', '_self');
      }
    }, 5 * 60 * 1000); // 5 minutes
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, user, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
