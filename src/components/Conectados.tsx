"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { UserContext } from "@/context/UserContext";
import { fetchFriends } from "@/helpers/users";
import Link from "next/link";
import { useSocket } from "@/helpers/useSocket";
import { User as BaseUser } from "@/helpers/users";
import { usePathname } from "next/navigation";

interface User extends BaseUser {
	id: string;
	username: string;
	profile_image: string;
	friends: [];
	isOnline: boolean;
}

const Conectados: React.FC = () => {
	const { userId, userData } = useContext(UserContext);
	const [friends, setFriends] = useState<User[]>([]);
	const { getOnlineUsers, onlineUsers } = useSocket();

	const pathname = usePathname();
	const shouldRenderLayout = !(
		pathname?.includes("/dashboard") ||
		pathname?.includes("/register") ||
		pathname?.includes("/completarregistro") ||
		pathname?.includes("/terminos") ||
		pathname === "/"
	);

	useEffect(() => {
		if (!userId || !userData) return;

		const fetchUserFriends = async () => {
			try {
				const fetchedFriends = await fetchFriends(userId);
				setFriends((prevFriends) =>
					prevFriends.map((friend) => ({
						...friend,
						isOnline: onlineUsers.includes(friend.id),
					}))
				);
				setFriends(fetchedFriends);
				getOnlineUsers();
			} catch (error) {
				console.error("Error al obtener la lista de amigos:", error);
			}
		};

		fetchUserFriends();
		getOnlineUsers();
	}, [userId, getOnlineUsers, onlineUsers, userData]);

	if (!userData) {
		return;
	}
	const friendsWithOnlineStatus = friends.map((friend) => ({
		...friend,
		isOnline: onlineUsers.includes(friend.id),
	}));

	const sortedFriends = [...friendsWithOnlineStatus].sort((a, b) => {
		if (a.isOnline === b.isOnline) return 0;
		return a.isOnline ? -1 : 1;
	});

	return (
		<>
			{shouldRenderLayout && (
				<aside className="hidden fixed lg:block w-64 h-screen overflow-y-auto p-4 right-2 top-24 md:mr-4">
					{sortedFriends.length === 0 ? (
						<p className="text-gray-500 text-sm">
							No hay amigos disponibles en este momento.
						</p>
					) : (
						<div className="overflow-y-auto max-h-96 sm:max-h-[70vh] h-[300px] sm:h-auto">
							{sortedFriends.map((friend) => (
								<Link key={friend.id} href={`/chat/${friend.username}`}>
									<div>
										<div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
											<div className="flex items-center space-x-4">
												<div className="relative w-12 h-12">
													<Image
														src={friend.profile_image}
														alt={friend.username}
														layout="fill"
														className="rounded-full object-cover"
													/>
												</div>
												<h3 className="text-sm font-semibold">
													{friend.username}
												</h3>
											</div>
											<div>
												<span
													className={`w-3 h-3 rounded-full block ml-2 ${
														friend.isOnline ? "bg-green-500" : "bg-gray-400"
													}`}
												></span>
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					)}
				</aside>
			)}
		</>
	);
};

export default Conectados;
