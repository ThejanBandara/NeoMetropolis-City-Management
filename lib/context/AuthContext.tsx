'use client'
// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { officer } from "@/types/Officer";

interface AuthContextType {
  user: officer | null;
  login: (officer: officer) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<officer | null>(null);

  const login = (officer: officer) => setUser(officer);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
