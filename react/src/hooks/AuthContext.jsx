import React, { createContext, useContext, useState } from "react";

// Creating an authentication context
const AuthContext = createContext(null);

// Auth provider component that wraps your app components
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_EMPLOYEES_API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await response.json();
      if (data) {
        setUser({
          username: data.username,
          fk_id: data.fk_id, // Storing the uid returned from the server
        });
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_EMPLOYEES_API_URL}/userObj`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user }),
        }
      );
      const data = await response.json();
      if (data) {
        setUser({
          userobj: data, // Storing the uid returned from the server
        });
      } else {
        throw new Error(data.message || "User obj failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null); // In real scenarios, you might want to invalidate the session on the server as well
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use authentication
export const useAuth = () => useContext(AuthContext);
