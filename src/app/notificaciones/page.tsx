"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { UserContext } from "@/context/UserContext";
import { INotification } from "@/interfaces/types";
import { timeAgo } from "@/helpers/timeAgo";
import Link from "next/link";

enum NotificationType {
	MENSAJES = "mensajes",
	COMENTARIOS = "comentarios",
	REACCIONES = "reacciones",
	SEGUIDORES = "seguidores",
}

const ActivityView = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [notifications, setNotifications] = useState<INotification[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const { userData } = useContext(UserContext);

	const categoryMapping: Record<string, string> = {
		message: NotificationType.MENSAJES,
		comment: NotificationType.COMENTARIOS,
		reaction: NotificationType.REACCIONES,
		follower: NotificationType.SEGUIDORES,
	};

	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/notifications/readAll/${userData?.id}`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/notifications/user/${userData?.id}`
				);
				if (!response.ok) {
					throw new Error("Error fetching notifications");
				}
				const data: INotification[] = await response.json();

				const sortedNotifications = data.sort((a, b) => {
					const dateA = new Date(a.creation_date);
					const dateB = new Date(b.creation_date);
					return dateB.getTime() - dateA.getTime();
				});

				setNotifications(sortedNotifications);
			} catch (error) {
				console.error("Error fetching notifications:", error);
			} finally {
				setLoading(false);
			}
		};

		if (userData?.id) {
			fetchNotifications();
		}
	}, [userData?.id]);

	const handleCategoryClick = (category: string) => {
		setSelectedCategory(category);
	};

	const filteredNotifications = selectedCategory
		? notifications.filter(
				(notification) =>
					categoryMapping[notification.type] === selectedCategory
		  )
		: notifications;

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="w-full ">
			<div className="flex-1 flex justify-center items-start px-4 w-full pt-20">
				<div className="w-full max-w-2xl bg-white rounded-lg p-6">
					<h1 className="text-2xl font-bold text-center mb-4">Actividad</h1>

					<div className="flex justify-center flex-wrap gap-4 mb-6">
						{Object.values(NotificationType).map((category) => (
							<button
								key={category}
								className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
								onClick={() => handleCategoryClick(category)}
							>
								{category.replace(/_/g, " ")}
							</button>
						))}
					</div>

					<div className="space-y-6">
						{filteredNotifications.map((notification) => {
							const { notification_id, content, creation_date, user_sender } =
								notification;

							return (
								<div
									key={notification_id}
									className="flex items-center justify-between lg:pl-44 sm:pl-5 mt-12"
								>
									<div className="flex items-center">
										<div className="relative w-10 h-10">
											<Link
												href={`/perfil/${notification.user_sender.username}`}
											>
												<Image
													src={user_sender?.profile_image}
													alt={content}
													layout="fill"
													className="rounded-full object-cover"
												/>
											</Link>
										</div>
										<div className="ml-3">
											<p className="text-sm">
												<span className="font-semibold">
													<Link
														href={`/perfil/${notification.user_sender.username}`}
													>
														{user_sender.username}
													</Link>
												</span>{" "}
												{content}
											</p>
											<p className="text-xs text-gray-500">
												{timeAgo(creation_date)}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ActivityView;
