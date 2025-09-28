import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (emailOrUsername: string, password: string) => Promise<{user: User | null, error?: string}>;
  register: (username: string, email: string, password: string, firstName?: string, lastName?: string, phone?: string) => Promise<{user: User | null, error?: string}>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Restore session from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('auth_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
  }, []);

  const login = async (emailOrUsername: string, password: string): Promise<{user: User | null, error?: string}> => {
    const result = await api.login(emailOrUsername, password);
    if (result.user) {
      setUser(result.user);
    }
    return result;
  };

  const register = async (username: string, email: string, password: string, firstName?: string, lastName?: string, phone?: string): Promise<{user: User | null, error?: string}> => {
    const result = await api.register(username, email, password, firstName, lastName, phone);
    if (result.user) {
      setUser(result.user);
    }
    return result;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};