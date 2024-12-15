"use client";

import { IUserContextType } from "@/interfaces/types";
import { createContext, useState } from "react";
import { ReactNode } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext<IUserContextType>({
  token: null,
  setToken: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(Cookies.get("auth_token") || null);

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
