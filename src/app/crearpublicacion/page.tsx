"use client";

import React, { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { showCustomToast } from "@/components/Notificacion";
import { useRouter } from "next/navigation";

const CrearPublicacion = () => {
	const [contenido, setContenido] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null); 
	const [fileSizeError, setFileSizeError] = useState<string | null>(null);
	const { userData } = useContext(UserContext);
	const router = useRouter();

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files ? event.target.files[0] : null;
		if (selectedFile) {
			const isValidImage = selectedFile.type.startsWith("image/");
			if (!isValidImage) {
				alert("Por favor selecciona un archivo de imagen.");
				setFileSizeError(null);
				setFile(null);
				setPreview(null);
				return;
			}

			setFileSizeError(null);
			setFile(selectedFile);

			// Genera la previsualización
			const reader = new FileReader();
			reader.onload = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(selectedFile);
		} else {
			setPreview(null); 
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
				showCustomToast("Snappy", "Publicación subida con éxito", "success");
				setFile(null);
				setPreview(null); 
				setContenido("");
				setTimeout(() => { router.push("/socialfeed") }, 1000);
			} else {
				showCustomToast("Snappy", "Error al subir la publicación", "error");
			}
		} catch (error) {
			console.error("Error uploading image:", error);
			showCustomToast("Snappy", "Error al subir la publicación", "error");
		}
	};

	return (
		<>
			<div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg">
				<h2 className="text-2xl font-bold mb-4">Crear Snappy Post</h2>
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
						accept="image/*" // Acepta solo imágenes
					/>

					
					{preview && (
						<div className="w-full flex justify-center mb-4">
							<img
								src={preview}
								alt="Preview"
								className="max-w-full h-auto border rounded"
							/>
						</div>
					)}

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

		
		</>
	);
};

export default CrearPublicacion;
