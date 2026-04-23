import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCurrentUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/check");
      setCurrentUser(response.data);
    } catch (error) {
      console.log("Auth check failed:", error.message);

      setCurrentUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await api.post("/login", { username, password });

      const token = response.data.accessToken;

      localStorage.setItem("token", token);

      setCurrentUser(response.data);

      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      setCurrentUser(null);
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        login,
        logout,
        checkAuthStatus,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
