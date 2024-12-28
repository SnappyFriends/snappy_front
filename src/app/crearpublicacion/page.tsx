"use client";

import React, { useContext, useState } from "react";
import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/NavBar";
import Conectados from "@/components/Conectados";
import { UserContext } from "@/context/UserContext";
import { showCustomToast } from "@/components/Notificacion";

const CrearPublicacion = () => {
	const [contenido, setContenido] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [fileSizeError, setFileSizeError] = useState<string | null>(null);
	const { userData } = useContext(UserContext);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files ? event.target.files[0] : null;
		if (selectedFile) {
			const isValidImage = selectedFile.type.startsWith("image/");
			if (!isValidImage) {
				alert("Por favor selecciona un archivo de imagen.");
				setFileSizeError(null);
				setFile(null);
				return;
			}

			if (selectedFile.size > 200 * 1024) {
				setFileSizeError("La imagen debe ser de máximo 200 KB.");
				setFile(null);
			} else {
				setFileSizeError(null);
				setFile(selectedFile);
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!userData?.id || !file) return;

		const formData = new FormData();
		formData.append("userId", userData.id);
		formData.append("content", contenido);
		formData.append("fileImg", file);

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Failed to upload image: ${errorText}`);
			}

			const result = await response.json();

			if (result.fileUrl) {
				console.log("Imagen cargada con éxito:", result.fileUrl);

				showCustomToast("Snappy", "Publicación subida con éxito", "success");
			} else {
				console.error(
					"La respuesta del servidor no incluye la URL de la imagen."
				);
				showCustomToast("Snappy", "Error al subir la publicación", "error");
			}
		} catch (error) {
			console.error("Error uploading image:", error);
			showCustomToast("Snappy", "Error al subir la publicación", "error");
		}
	};

	return (
		<>
			<NavBar />
			<Sidebar />

			<div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg">
				<h2 className="text-2xl font-bold mb-4">Crear Publicación</h2>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<textarea
						className="p-2 border rounded"
						placeholder="Escribe tu publicación aquí..."
						value={contenido}
						onChange={(e) => setContenido(e.target.value)}
						required
					></textarea>

					<input
						type="file"
						name="fileImg"
						id="fileImg"
						onChange={handleFileChange}
						className="p-2 border rounded"
					/>

					{fileSizeError && (
						<p className="text-red-500 text-center text-sm">{fileSizeError}</p>
					)}

					<button
						type="submit"
						className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
					>
						Publicar
					</button>
				</form>
			</div>

			<div className="hidden md:flex flex-col w-80 space-y-6 absolute right-20 top-1/2 transform -translate-y-1/2">
				<Conectados />
			</div>
		</>
	);
};

export default CrearPublicacion;
