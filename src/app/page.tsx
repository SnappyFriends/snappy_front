'use client';

import HeaderLoginRegister from "@/components/HeaderLoginRegister";
import Login from "@/components/Login";
import FooterLoginRegister from "../components/FooterLoginRegister";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

export default function Home() {
  const { prueba } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center justify-center gap-16 min-h-screen">
      <h1>{prueba}</h1>
      <HeaderLoginRegister />
      <Login />
      <FooterLoginRegister />
    </div>
  );
}
