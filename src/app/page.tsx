"use client";

import Login from "@/components/Login";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

export default function Home() {
  const { prueba } = useContext(UserContext);

  return (
    <>
      <Login />
    </>
  );
}
