"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getUsersByUsername } from "@/helpers/users";
import NotFound from "@/app/not-found";
import { IUsernameData } from "@/interfaces/types";
import VerifiedAccount from "@/components/VerifiedAccount";
import { UserContext } from "@/context/UserContext";
import { showCustomToast } from "@/components/Notificacion";
import PostDetails from "@/components/PostDetails";

interface IPost {
	post_id: string;
	content: string;
	creation_date: string;
	fileUrl: string;
	user: {
		username: string;
		profile_image: string;
		user_type: string;
	};
	reactions: Array<{
		id: string;
		user: {
			username: string;
			profile_image: string;
			user_type: string;
		};
	}>;
	comments: Array<{ content: string; username: string }>;
}

const ProfileView = ({
	params,
}: {
	params: Promise<{ otroperfil: string }>;
}) => {
	const [userTargetData, setUserTargetData] = useState<IUsernameData | null>(
		null
	);
	const [username, setUsername] = useState<string | null>(null);
	const { userData } = useContext(UserContext);
	const [followingState, setFollowingState] = useState<boolean>(false);
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState<"followers" | "following" | null>(
		null
	);
	const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
	const [showReportModal, setShowReportModal] = useState(false);
	const [reportDescription, setReportDescription] = useState("");

	const handleFriendRequest = async () => {
		if (!followingState) {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/follow/${userData?.id}/${userTargetData?.id}`,
				{
					method: "POST",
				}
			);

			if (!response.ok)
				throw new Error(`Ocurrió un error al intentar seguir a este usuario.`);

			showCustomToast(
				"Snappy",
				"Comenzaste a seguir a este usuario.",
				"success"
			);

			setUserTargetData((prevData) => {
				if (!prevData) return prevData;
				return {
					...prevData,
					followers: [
						...prevData.followers,
						{
							id: userData?.id || "",
							follower: {
								id: userData?.id || "",
								username: userData?.username || "",
								profile_image: userData?.profile_image || "",
							},
						},
					],
				};
			});

			if(userTargetData) console.log("userTargetData 1: ", userTargetData.followers);

			userData?.following.push({
				id: userTargetData?.id || "",
				username: "",
				profile_image: "",
			});
		} else {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/follow/${userData?.id}/${userTargetData?.id}`,
				{
					method: "DELETE",
				}
			);

			if (!response.ok)
				throw new Error(
					`Ocurrió un error al intentar dejar de seguir a este usuario.`
				);

			showCustomToast("Snappy", "Dejaste de seguir a este usuario.", "success");

			setUserTargetData((prevData) => {
				if (!prevData) return prevData;
				return {
					...prevData,
					followers: prevData.followers.filter(
						(follower) => follower.id !== (userData?.id || "")
					),
				};
			});

			if (userData) {
				userData.following = userData.following.filter(
					(followed) => followed.id !== userTargetData?.id
				);
			}
		}

		setFollowingState(!followingState);
	};

	const handleOpenModal = (type: "followers" | "following") => {
		setModalType(type);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setModalType(null);
	};

	const handleOpenReportModal = () => {
		setShowReportModal(true);
	};

	const handleCloseReportModal = () => {
		setShowReportModal(false);
		setReportDescription("");
	};

	const handleReportSubmit = async () => {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				reporting: userData?.id,
				reported: userTargetData?.id,
				description: reportDescription,
			}),
		});

		if (response.ok) {
			showCustomToast("Snappy", "Reporte enviado con éxito.", "success");
			handleCloseReportModal();
		} else {
			showCustomToast("Snappy", "Error al enviar el reporte.", "error");
		}
	};

	useEffect(() => {
		const fetchParams = async () => {
			const resolvedParams = await params;
			if (resolvedParams.otroperfil) {
				setUsername(resolvedParams.otroperfil);
			}
		};
		fetchParams();
	}, [params]);

	useEffect(() => {
		if (username) {
			(async () => {
				try {
					const user = await getUsersByUsername(username);
					if (user) {
						setUserTargetData(user);
					} else {
						return <NotFound />;
					}
				} catch (error) {
					console.error("Error al obtener los datos del usuario:", error);
				}
			})();
		}
	}, [username]);

	useEffect(() => {
		if (userTargetData) {
			if (userTargetData.followers && userTargetData.followers.length > 0) {
				const isFollowing = userTargetData.followers.map((follower) => {
					if (follower.follower.id == userTargetData.id) return true;
					else return false;
				});

				console.log("userTargetData 2: ", userTargetData.followers);
				if (isFollowing) setFollowingState(true);
				console.log("isFollowing?: ", isFollowing);
			}
		}
	}, [userTargetData]);

	if (!userTargetData) return "Cargando...";

	const fetchPostDetails = async (postId: string) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`
			);
			if (!response.ok) {
				throw new Error("Error al obtener el post");
			}
			const post = await response.json();
			setSelectedPost(post);
		} catch (error) {
			console.error("Error fetching post details:", error);
		}
	};

	const closePostDetails = () => {
		setSelectedPost(null);
	};

	return (
		<>
			<main className="min-h-screen">
				<section className="flex flex-col justify-center items-center gap-3 md:gap-4 pt-3 md:pt-4 px-4">
					<div className="w-32 h-32 md:w-40 md:h-40 lg:w-60 lg:h-60 rounded-full overflow-hidden border-4 border-black shadow-md">
						<Image
							src={userTargetData.profile_image}
							alt="Foto de perfil"
							width={600}
							height={600}
							className="object-cover w-full h-full"
						/>
					</div>
					<h1 className="text-lg font-bold md:text-xl lg:text-2xl">
						{userTargetData.fullname}{" "}
						{userTargetData?.user_type === "premium" ? <VerifiedAccount /> : ""}
					</h1>
					<div className="flex flex-wrap justify-center gap-4">
						<article
							onClick={() => handleOpenModal("following")}
							className="text-center w-24 md:w-28 cursor-pointer"
						>
							<p className="text-lg font-bold md:text-xl">
								{userTargetData.following.length}
							</p>
							<p>Seguidos</p>
						</article>
						<article
							onClick={() => handleOpenModal("followers")}
							className="text-center w-24 md:w-28 cursor-pointer"
						>
							<p className="text-lg font-bold md:text-xl">
								{userTargetData.followers.length}
							</p>
							<p>Seguidores</p>
						</article>
						<article className="text-center w-24 md:w-28">
							<p className="text-lg font-bold md:text-xl">
								{userTargetData.posts.length}
							</p>
							<p>Publicaciones</p>
						</article>
					</div>
					<div className="px-2 text-center">
						<p>{userTargetData.description}</p>
					</div>

					<div className="flex flex-wrap justify-center gap-4">
						<button
							onClick={handleFriendRequest}
							className={`px-4 py-2 text-white rounded-md ${
								followingState == true
									? "bg-gray-500 hover:bg-gray-600"
									: "bg-blue-500 hover:bg-blue-600"
							}`}
						>
							{followingState == true ? "Siguiendo" : "Seguir"}
						</button>
						<Link
							href={`/chat/${userTargetData.username}`}
							className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md"
						>
							Enviar mensaje
						</Link>
						<button
							onClick={handleOpenReportModal}
							className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
						>
							Reportar
						</button>
					</div>
					{userTargetData.interests?.length > 0 && (
						<div className="w-full px-2 text-center">
							{userTargetData.interests &&
								userTargetData.interests.length > 0 && (
									<p>
										<span className="font-bold">Intereses: </span>
										{userTargetData.interests
											.map((interest) => interest.name)
											.join(", ")}
									</p>
								)}
						</div>
					)}
					<section className="px-4 py-6">
						{userTargetData.posts.length > 0 ? (
							<div className="flex flex-wrap justify-center gap-4 max-w-6xl">
								{userTargetData.posts.map((post) => (
									<div
										key={post.post_id}
										className="relative w-[calc(50%-8px)] md:w-[calc(33.333%-12px)] lg:w-[calc(25%-16px)] aspect-square"
									>
										<Image
											src={post.fileUrl}
											alt={`Imagen del post ${post.post_id}`}
											width={500}
											height={500}
											className="object-cover rounded-md hover:opacity-80 cursor-pointer"
											onClick={() => fetchPostDetails(post.post_id)}
										/>
									</div>
								))}
							</div>
						) : (
							<p className="text-gray-500">
								{userTargetData.fullname} no tiene publicaciones.
							</p>
						)}
					</section>
					{selectedPost && (
						<PostDetails post={selectedPost} close={closePostDetails} />
					)}
				</section>

				{showModal && modalType && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
						<div className="bg-white rounded-lg p-6 w-full max-w-lg flex flex-col relative">
							<button
								className="absolute top-2 right-2 text-black font-bold"
								onClick={handleCloseModal}
							>
								X
							</button>
							<h2 className="text-lg font-bold mb-4">
								{modalType === "following" ? "Seguidos" : "Seguidores"}
							</h2>
							{modalType === "following"
								? userTargetData.following.map((user) => {
										const profileData = user.following;

										return (
											<div
												key={profileData.id}
												className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
											>
												{profileData && (
													<Link
														href={`/perfil/${profileData.username}`}
														className="text-black hover:underline"
													>
														<div className="flex items-center gap-3">
															<Image
																src={profileData.profile_image}
																alt={profileData.username}
																width={40}
																height={40}
																className="rounded-full"
															/>
															<p>{profileData.username}</p>
														</div>
													</Link>
												)}
											</div>
										);
								  })
								: userTargetData.followers.map((user) => {
										const profileData = user.follower;

										return (
											<div
												key={profileData.id}
												className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
											>
												{profileData && (
													<Link
														href={`/perfil/${profileData.username}`}
														className="text-black hover:underline"
													>
														<div className="flex items-center gap-3">
															<Image
																src={profileData.profile_image}
																alt={profileData.username}
																width={40}
																height={40}
																className="rounded-full"
															/>
															<p>{profileData.username}</p>
														</div>
													</Link>
												)}
											</div>
										);
								  })}
							{(modalType === "following"
								? userTargetData.following
								: userTargetData.followers
							).length === 0 && (
								<p className="text-gray-500">
									El usuario ${userTargetData.username} no tiene{" "}
									{modalType === "following" ? "seguidos" : "seguidores"}.
								</p>
							)}
						</div>
					</div>
				)}

				{showReportModal && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
						<div className="bg-white rounded-lg p-6 w-full max-w-lg flex flex-col relative">
							<button
								className="absolute top-2 right-2 text-black font-bold"
								onClick={handleCloseReportModal}
							>
								X
							</button>
							<h2 className="text-lg font-bold mb-4">Reportar Usuario</h2>
							<textarea
								className="w-full p-2 border border-gray-300 rounded-md mb-4"
								rows={4}
								placeholder="Escribe el motivo del reporte"
								value={reportDescription}
								onChange={(e) => setReportDescription(e.target.value)}
							/>
							<button
								onClick={handleReportSubmit}
								className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
							>
								Enviar Reporte
							</button>
						</div>
					</div>
				)}
			</main>
		</>
	);
};

export default ProfileView;
