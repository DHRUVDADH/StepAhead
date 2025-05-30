// AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for token when app loads
    const token = localStorage.getItem("accessToken");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else if (token) {
      // Optional: validate token with server if you want
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("accessToken", token);
    const userToStore = userData ? { ...userData, token } : { token };
    localStorage.setItem("user", JSON.stringify(userToStore));
    setUser(userToStore);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user"); // ✅ Important!
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
