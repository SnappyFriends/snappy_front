import ActualizarPerfil from "@/components/ActualizarPerfil";
import Conectados from "@/components/Conectados";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import React from "react";

export default function EditarPerfil() {
	return (
		<>
			<NavBar />
			<Sidebar />
			<ActualizarPerfil />
			<div className="hidden md:flex flex-col w-80 space-y-6 absolute right-20 top-1/2 transform -translate-y-1/2">
				<Conectados />
			</div>
		</>
	);
}
