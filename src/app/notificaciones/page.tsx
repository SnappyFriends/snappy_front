"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Conectados from "@/components/Conectados";
import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/NavBar";
import { UserContext } from "@/context/UserContext";
import { INotification } from "@/interfaces/types";

enum NotificationType {
	FRIEND_REQUEST = "friend_request",
	MESSAGE = "message",
	POST_REACTION = "post_reaction",
	COMMENT = "comment",
	GROUP_INVITATION = "group_invitation",
	SYSTEM = "system",
	PURCHASE = "purchase",
}

const ActivityView = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const categories = Object.values(NotificationType);
	const [notifications, setNotifications] = useState<INotification[]>([]);
	const { userData } = useContext(UserContext);

	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/notifications/user/${userData?.id}`
				);
				if (!response.ok) {
					throw new Error("Error fetching notifications");
				}
				const data: INotification[] = await response.json();
				setNotifications(data);
			} catch (error) {
				console.error("Error fetching notifications:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchNotifications();
	}, [userData?.id]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<NavBar />

			<div className="flex min-h-screen">
				<div className="hidden md:flex flex-col w-64 bg-white p-6 space-y-10 fixed left-6 top-1/2 transform -translate-y-1/2">
					<Sidebar />
				</div>

				<div className="flex-1 flex justify-center items-start px-4 md:ml-64 lg:mr-64 pt-20">
					<div className="w-full max-w-2xl bg-white rounded-lg p-6">
						<h1 className="text-2xl font-bold text-center mb-4">Actividad</h1>

						<div className="flex justify-center flex-wrap gap-4 mb-6">
							{categories.map((category) => (
								<button
									key={category}
									className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
								>
									{category.replace(/_/g, " ")}
								</button>
							))}
						</div>

						<div className="space-y-6">
							{notifications.map((notification) => {
								const {
									notification_id,
									content,
									type,
									status,
									creation_date,
								} = notification;
								const formattedDate = new Date(
									creation_date
								).toLocaleDateString();

								return (
									<div
										key={notification_id}
										className="flex items-center justify-between"
									>
										<div className="flex items-center">
											<div className="relative w-10 h-10">
												<Image
													src="/agregarfoto.png"
													alt={content}
													layout="fill"
													className="rounded-full object-cover"
												/>
											</div>
											<div className="ml-3">
												<h2 className="text-sm font-semibold">{content}</h2>
												<p className="text-xs text-gray-500">
													{type.replace(/_/g, " ")} • {formattedDate}
												</p>
											</div>
										</div>
										{status === "unread" && (
											<button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm">
												{type === "friend_request" ? "Aceptar" : "Ver"}
											</button>
										)}
									</div>
								);
							})}
						</div>

						{/* <div className="space-y-6">
							{[
								{
									username: "starryskies23",
									action: "Te comenzó a seguir",
									time: "1d",
									button: "Seguir",
								},
								{
									username: "nebulanomad",
									action: "Liked your post",
									time: "1d",
									thumbnail: "/agregarfoto.png",
								},
								{
									username: "lunavoyager",
									action: "Te envió una solicitud",
									time: "3d",
									button: "Aceptar",
								},
								{
									username: "shadowlynx",
									action: "Commented on your post",
									time: "4d",
									comment: "I’m going in September. What about you?",
									thumbnail: "/agregarfoto.png",
								},
								{
									username: "emberecho",
									action: "Liked your comment",
									time: "2d",
									comment: "Happy birthday!!!",
								},
							].map((item, index) => (
								<div key={index} className="flex items-center justify-between">
									<div className="flex items-center">
										<div className="relative w-10 h-10">
											<Image
												src="/agregarfoto.png"
												alt={item.username}
												layout="fill"
												className="rounded-full object-cover"
											/>
										</div>
										<div className="ml-3">
											<h2 className="text-sm font-semibold">{item.username}</h2>
											<p className="text-xs text-gray-500">
												{item.action} • {item.time}
											</p>
											{item.comment && (
												<p className="text-xs text-gray-700 mt-1">
													{item.comment}
												</p>
											)}
										</div>
									</div>
									{item.button ? (
										<button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm">
											{item.button}
										</button>
									) : (
										item.thumbnail && (
											<div className="relative w-12 h-12">
												<Image
													src={item.thumbnail}
													alt="Post thumbnail"
													layout="fill"
													className="rounded-lg object-cover"
												/>
											</div>
										)
									)}
								</div>
							))}
						</div>
					</div> */}
					</div>
				</div>
				<div className="hidden md:flex flex-col w-80 space-y-6 absolute right-20 mt-40 ">
					<Conectados />
				</div>
			</div>
		</div>
	);
};

export default ActivityView;
