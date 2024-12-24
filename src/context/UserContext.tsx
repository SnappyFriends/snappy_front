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
  user_type: null,
  setUserType: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    Cookies.get("auth_token") || null
    
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [user_type,setUserType] = useState<string | null>(null)

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    if (savedUserId) {
      setUserId(savedUserId);
    }
    const savedUser_type = localStorage.getItem("user_type");
    if(savedUser_type){
      setUserType(savedUser_type)
    }
  }, []);

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    }
    if (user_type) {
      localStorage.setItem("user_type", user_type);
    }
    
  }, [userId, user_type]);

  return (
    <UserContext.Provider value={{ token, setToken, userId, setUserId, user_type, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};
