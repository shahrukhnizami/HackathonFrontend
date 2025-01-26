import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize from sessionStorage if available
    const token = sessionStorage.getItem('jwtToken');
    const userData = token ? JSON.parse(sessionStorage.getItem('user')) : null;
    return userData;
  });

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('jwtToken', userData.token); // Save the token
    sessionStorage.setItem('user', JSON.stringify(userData)); // Save user data
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('user'); // Clear user data
  };

  useEffect(() => {
    // Sync user state on refresh
    const token = sessionStorage.getItem('jwtToken');
    const userData = token ? JSON.parse(sessionStorage.getItem('user')) : null;
    if (!user && userData) {
      setUser(userData);
    }
  }, [user]);

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
