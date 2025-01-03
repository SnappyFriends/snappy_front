"use client";

import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { getUsers } from "@/helpers/users";
import { UserContext } from "@/context/UserContext";
import Sidebar from "@/components/Sidebar";
import Conectados from "@/components/Conectados";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface IUserAPIResponse {
	username: string;
	id: string;
	user_type?: string;
	fullname?: string;
}

const ChatView = () => {
	const [userList, setUserList] = useState<IUserAPIResponse[]>([]);
	const [randomUser, setRandomUser] = useState<IUserAPIResponse | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [isRequestSent, setIsRequestSent] = useState<boolean>(false);
	const [sentRequests, setSentRequests] = useState<Set<string>>(
		new Set<string>()
	);

	const { userId } = useContext(UserContext);

	useEffect(() => {
		const savedRequests = localStorage.getItem("sentRequests");
		if (savedRequests) {
			setSentRequests(new Set(JSON.parse(savedRequests)));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("sentRequests", JSON.stringify([...sentRequests]));
	}, [sentRequests]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const users: IUserAPIResponse[] = await getUsers();
				setUserList(users);
				if (users.length > 0) {
					setRandomUser(users[Math.floor(Math.random() * users.length)]);
				}
			} catch (error) {
				console.error("Error al obtener usuarios:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	const handleSnappear = () => {
		if (userList.length > 0) {
			const newRandomUser =
				userList[Math.floor(Math.random() * userList.length)];
			setRandomUser(newRandomUser);

			if (sentRequests.has(newRandomUser.id)) {
				setIsRequestSent(true);
			} else {
				setIsRequestSent(false);
			}
		}
	};

	const handleSendRequest = async () => {
		if (!randomUser || !userId) return;
	
		try {
			const endpoint = isRequestSent
				? `${API_URL}/follow/${userId}/${randomUser.id}` 
				: `${API_URL}/follow/${userId}/${randomUser.id}`;  
	
			const response = await fetch(endpoint, {
				method: isRequestSent ? "DELETE" : "POST",
				headers: { "Content-Type": "application/json" },
			});
	
			if (response.ok) {
				setIsRequestSent(!isRequestSent); 
				setSentRequests((prev) => {
					const updatedRequests = new Set(prev);
					if (isRequestSent) {
						updatedRequests.delete(randomUser.id); 
					} else {
						updatedRequests.add(randomUser.id); 
					}
					return updatedRequests;
				});
			} else {
				const errorData = await response.json();
				alert(`Error: ${errorData.message}`);
			}
		} catch (error) {
			console.error("Error al conectarse al servidor:", error);
			alert("No se pudo procesar la acción.");
		}
	};
	
	return (
		<div>
			<NavBar />
			<Sidebar />

			<div className="flex items-center justify-center mt-10 mb-5 ">
				<div className="bg-white rounded-lg shadow-md w-1/2 max-w-lg relative">
					<div className="flex items-center justify-between px-4 py-3 border-b">
						<div className="flex items-center">
							<div className="relative w-12 h-12">
								<Image
									src="/agregarfoto.png"
									alt="Foto de perfil"
									layout="fill"
									className="rounded-full object-cover"
								/>
							</div>
							<div className="ml-3">
								{loading ? (
									<p className="text-gray-500">Cargando usuario...</p>
								) : randomUser ? (
									<>
										<h1 className="text-lg font-semibold flex items-center">
											<Link
												href={`/perfil/${randomUser.username}`}
												className="text-black hover:underline"
											>
												@{randomUser.username}
											</Link>
										</h1>
										<p className="text-sm text-gray-500">
											{randomUser.fullname}
										</p>
									
									</>
								) : (
									<p className="text-gray-500">No hay usuarios disponibles</p>
								)}
							</div>
						</div>
						<button
							onClick={handleSendRequest}
							className={`${
								isRequestSent ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
							} text-white px-4 py-2 rounded-lg text-sm transition`}
						>
							{isRequestSent ? "Dejar de seguir" : "Seguir"}
						</button>
					</div>
					<div className="flex-1 px-4 py-6 overflow-y-auto min-h-[60vh]">
						{randomUser ? (
							<p className="text-center text-gray-400">
								Inicia tu conversación con @{randomUser.username}
							</p>
						) : (
							<p className="text-center text-gray-400">
								Esperando selección...
							</p>
						)}
					</div>
					<div className="px-4 py-3 border-t flex items-center">
						<input
							type="text"
							placeholder="Escribe un mensaje..."
							className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<div className="flex items-center ml-3 space-x-3">
							<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition"> Enviar
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center w-full">
				<button
					onClick={handleSnappear}
					className="relative w-16 h-16 cursor-pointer"
					aria-label="Buscar nuevo usuario"
					title="Snappear"
				>
					<Image
						src="/snappear.png"
						alt="Snappear"
						layout="fill"
						className="object-contain"
					/>
				</button>
			</div>

			<div className="hidden md:flex flex-col w-80 space-y-6 absolute right-20 top-1/2 transform -translate-y-1/2">
				<Conectados />
			</div>
		</div>
	);
};

export default ChatView;
