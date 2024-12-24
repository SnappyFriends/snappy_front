import ActualizarPerfil from "@/components/ActualizarPerfil";
import NavBar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import React from "react";

export default function EditarPerfil() {
  return (
    <>
      <SearchBar />
      <ActualizarPerfil />
      <NavBar />
    </>
  );
}