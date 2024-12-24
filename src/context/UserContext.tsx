"use client";

import { IUserContextType } from "@/interfaces/types";
import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext<IUserContextType>({
  token: null,
  setToken: () => {},
  userId: null,
  setUserId: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    Cookies.get("auth_token") || null
    
  );
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    if (savedUserId) {
      setUserId(savedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ token, setToken, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
