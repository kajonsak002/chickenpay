"use client";

import React, { createContext, useContext } from "react";

export interface User {
  id: string;
  email: string;
  role: string;
  displayName?: string | null;
  wallet?: { balance: number; id: string };
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isAdmin: false,
});

export const AuthProvider = ({ 
  children, 
  user 
}: { 
  children: React.ReactNode; 
  user: User | null;
}) => {
  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      isAdmin: user?.role === "ADMIN" || user?.role === "SUPER_ADMIN",
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
