"use client";

import { IUserContextType } from "@/interfaces/types";
import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";

export const UserContext = createContext<IUserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSetToken = (newToken: string) => {
    setToken(newToken);
    const expireDate = new Date();
    expireDate.setHours(expireDate.getHours() + 24);
    document.cookie = `auth_token=${newToken}; expires=${expireDate.toUTCString()}; path=/`;
  };

  return (
    <UserContext.Provider value={{ token, setToken: handleSetToken }}>
      {children}
    </UserContext.Provider>
  );
};
