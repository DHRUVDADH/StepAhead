// AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage for token when app loads
    const token = localStorage.getItem('accessToken');
    if (token) {
      // You might want to validate the token here
      setUser({ token });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('accessToken', token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);