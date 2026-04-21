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
    try {
      const response = await api.get("/check");

      setCurrentUser(response.data);
      return response.data;
    } catch (error) {
      setCurrentUser(null);
      console.log("Authentication check failed:", error.message);
    } finally {
      setLoading(false);
    }
  }; 

  const login = async (username, password) => {
    try {
      const response = await api.post("/login", { username, password });

      setCurrentUser(response.data);

      console.log("Response: " + JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");

      setCurrentUser(null);

      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);

      setCurrentUser(null);
    }
  };

  const value = {
    user: currentUser,
    login,
    logout,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
