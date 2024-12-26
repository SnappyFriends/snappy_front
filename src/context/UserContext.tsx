"use client";

import { IUserContextType, IUserData } from "@/interfaces/types";
import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import Cookies from "js-cookie";
import { getUserById } from "@/services/userService";

export const UserContext = createContext<IUserContextType>({
  token: null,
  setToken: () => {},
  userId: null,
  setUserId: () => {},
  userData: null,
  setUserData: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    Cookies.get("auth_token") || null
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUserData | null>(null);

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

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const user = await getUserById(userId);
          setUserData(user);
        } catch (error) {
          console.error(
            "Error al cargar los datos del usuario en context",
            error
          );
        }
      };
      fetchUserData();
    }
  }, [userId]);

  return (
    <UserContext.Provider
      value={{ token, setToken, userId, setUserId, userData, setUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};
