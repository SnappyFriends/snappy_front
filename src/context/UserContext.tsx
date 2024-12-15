'use client';

import { createContext } from "react";
import { ReactNode } from "react";

export const UserContext = createContext<{ prueba: string } | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const prueba = "estoy en UserProvider dentro de UserContext";

  return (
    <UserContext.Provider value={{ prueba }}>{children}</UserContext.Provider>
  );
};
