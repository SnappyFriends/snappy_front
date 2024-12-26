import ConfiguracionComponent from "@/components/Configuracion";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import React from "react";

export default function Configuracion() {
  return (
    <>
      <SearchBar />
      <ConfiguracionComponent />
      <NavBar />
    </>
  );
}
