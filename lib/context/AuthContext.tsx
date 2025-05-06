'use client'
// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, use } from "react";
import { officer } from "@/types/Officer";
import { officers } from "@/types/Officer";

interface AuthContextType {
  users: officer[];
  user: officer | null;
  login: (officer: officer) => void;
  updateAvailability: (value: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<officer[]>(officers);
  const [user, setUser] = useState<officer | null>(null);

  const login = (officer: officer) => setUser(officer);

  const updateAvailability = (value: boolean) => {
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers];
      const index = prevUsers.findIndex(officer => officer.id === user?.id);
      updatedUsers[index].isAvailable = value;
      setUser(updatedUsers[index]);
      return updatedUsers;
  })
  }

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{users, user, login, updateAvailability, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
