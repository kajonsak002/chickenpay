"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isAdmin: false,
  setUser: () => { },
});

export const AuthProvider = ({
  children,
  user: initialUser
}: {
  children: React.ReactNode;
  user: User | null;
}) => {
  const [user, setUser] = useState<User | null>(initialUser);

  // Synchronize with server-side prop changes
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      isAdmin: user?.role === "ADMIN" || user?.role === "SUPER_ADMIN",
      setUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
