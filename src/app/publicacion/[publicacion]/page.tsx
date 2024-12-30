"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Conectados from "@/components/Conectados";
import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/NavBar";
import { Post } from "@/interfaces/types";
import Image from "next/image";
import { UserContext } from "@/context/UserContext";
import { showCustomToast } from "@/components/Notificacion";
import { timeAgo } from "@/helpers/timeAgo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import {
	faHeart as faRegHeart,
	faComment,
} from "@fortawesome/free-regular-svg-icons";

const Publicacion = ({
	params,
}: {
	params: Promise<{ publicacion: string }>;
}) => {
	const [post, setPost] = useState<Post | null>(null);
	const [uuid, setUuid] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [showCommentBox, setShowCommentBox] = useState(false);
	const [comment, setComment] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { userData } = useContext(UserContext);
	const router = useRouter();
	const [reaction, setReaction] = useState(false);

	useEffect(() => {
		const fetchParams = async () => {
			const resolvedParams = await params;
			if (resolvedParams.publicacion) {
				setUuid(resolvedParams.publicacion);
			}
		};
		fetchParams();
	}, [params]);

	useEffect(() => {
		if (uuid) {
			const fetchPost = async () => {
				try {
					const response = await fetch(
						`${process.env.NEXT_PUBLIC_API_URL}/posts/${uuid}`
					);
					if (!response.ok) {
						throw new Error("Error al obtener la publicación");
					}
					const data = await response.json();
					setPost(data);
					setLoading(false);
				} catch (error) {
					console.error(error);
					setLoading(false);
				}
			};

			fetchPost();
		}
	}, [uuid, reaction]);

	const handleCommentSubmit = async () => {
		if (!comment.trim()) return;

		if (!userData) return;

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/comments`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					content: comment,
					user_id: userData?.id,
					post_id: uuid,
				}),
			}
		);

		if (response.ok) {
			showCustomToast("Snappy", "Comentario enviado", "success");

			const newComment = {
				id: Date.now().toString(),
				content: comment,
				user: {
					id: userData.id,
					username: userData.username,
					profile_image: userData.profile_image,
				},
			};

			setPost((prevPost) => {
				if (prevPost) {
					return {
						...prevPost,
						comments: [newComment, ...prevPost.comments],
					};
				}
				return prevPost;
			});

			setShowCommentBox(false);
			setComment("");
		} else {
			alert("Hubo un error al enviar el comentario");
		}
	};

	const handleDeletePost = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/posts/${uuid}`,
				{
					method: "DELETE",
				}
			);
			if (response.ok) {
				showCustomToast("Snappy", "Publicación eliminada", "success");

				setTimeout(() => {
					router.push("/socialfeed");
				}, 1000);
			} else {
				alert("Hubo un error al eliminar la publicación");
			}
		} catch (error) {
			console.error("Error al eliminar publicación:", error);
		}
		setShowDeleteModal(false);
	};

	const handleLikeToggle = async (postId: string, isLiked: boolean) => {
		if (!userData || !post) return;

		try {
			const existingReaction = post.reactions.find(
				(reaction) => reaction.user.id === userData.id
			);

			if (isLiked && existingReaction) {
				await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/reactions/${existingReaction.id}`,
					{
						method: "DELETE",
						headers: { "Content-Type": "application/json" },
					}
				);

				setPost((prevPost) =>
					prevPost
						? {
								...prevPost,
								reactions: prevPost.reactions.filter(
									(reaction) => reaction.id !== existingReaction.id
								),
						  }
						: prevPost
				);

				setReaction(false);
			} else {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/reactions/${postId}`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							user_id: userData.id,
							reaction: "like",
							reaction_type: "post",
						}),
					}
				);

				const newReaction = await response.json();

				setPost((prevPost) =>
					prevPost
						? {
								...prevPost,
								reactions: [...prevPost.reactions, newReaction],
						  }
						: prevPost
				);

				setReaction(true);
			}
		} catch (error) {
			console.error("Error toggling like:", error);
		}
	};

	if (loading) {
		return <div>Cargando...</div>;
	}

	if (!post) {
		return <div>Publicación no encontrada</div>;
	}

	const isLiked = post.reactions.some(
		(reaction) => reaction.user.id === userData?.id
	);

	return (
		<>
			<NavBar />
			<div className="flex flex-row">
				<div className="hidden md:flex flex-col w-64 bg-white p-6 space-y-10 fixed left-6 top-1/2 transform -translate-y-1/2">
					<Sidebar />
				</div>

				<div className="flex-1 flex flex-col items-center max-w-6xl px-4 md:px-8 mt-10 mx-auto">
					<div className="w-full max-w-md space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<div className="relative w-10 h-10">
									<Image
										src={post.user.profile_image}
										alt={post.user.username}
										layout="fill"
										className="rounded-full object-cover"
									/>
								</div>
								<div className="ml-4">
									<h2 className="text-sm font-semibold">
										{post.user.username}
									</h2>
									<p className="text-xs text-gray-500">
										{timeAgo(post.creation_date)}{" "}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<button className="bg-green-500 text-white px-4 py-1 rounded-full text-sm">
									Seguir
								</button>

								{userData?.username === post.user.username && (
									<div className="relative">
										<button
											onClick={() => setShowDropdown((prev) => !prev)}
											className="text-xs text-gray-500"
										>
											⋮
										</button>
										{showDropdown && (
											<div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
												<button
													onClick={() => setShowDeleteModal(true)}
													className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
												>
													Eliminar publicación
												</button>
											</div>
										)}
									</div>
								)}
							</div>
						</div>

						<div className="relative w-full h-80">
							<Image
								src={post.fileUrl}
								alt="Post image"
								layout="fill"
								className="rounded-lg object-cover"
							/>
						</div>

						<p className="text-sm text-gray-700">{post.content}</p>

						<div className="flex items-center justify-between">
							<div className="flex space-x-3">
								<p
									className={`text-xs cursor-pointer ${
										isLiked ? "text-red-500" : "text-gray-500"
									}`}
									onClick={() => handleLikeToggle(post.post_id, isLiked)}
									style={{
										transform: "scale(1)",
										transition: "transform 0.2s",
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.transform = "scale(1.1)")
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.transform = "scale(1)")
									}
								>
									<FontAwesomeIcon
										icon={isLiked ? faSolidHeart : faRegHeart}
										size="lg"
									/>{" "}
									{post.reactions.length}
								</p>
								<p className="text-xs text-gray-500">
									<FontAwesomeIcon icon={faComment} size="lg" />{" "}
									{post.comments.length}
								</p>
							</div>
							<button
								onClick={() => setShowCommentBox((prev) => !prev)}
								className="bg-blue-500 text-white px-4 py-1 rounded-full text-xs"
							>
								Comentar
							</button>
						</div>

						{showCommentBox && (
							<div className="mt-4">
								<textarea
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									className="w-full p-2 border border-gray-300 rounded-md"
									placeholder="Escribe tu comentario..."
								/>
								<button
									onClick={handleCommentSubmit}
									className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-full"
								>
									Enviar
								</button>
							</div>
						)}

						{post.comments?.length > 0 && (
							<div className="mt-6 space-y-4">
								{post.comments.map((comment) => (
									<div key={comment.id} className="flex items-start space-x-4">
										<div className="relative w-8 h-8">
											<Image
												src={comment.user.profile_image}
												alt={comment.user.username}
												layout="fill"
												className="rounded-full object-cover"
											/>
										</div>
										<div>
											<p className="font-semibold text-sm">
												{comment.user.username}
											</p>
											<p className="text-sm text-gray-700">{comment.content}</p>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				<div className="hidden md:flex flex-col w-80 space-y-6 absolute right-20 top-1/2 transform -translate-y-1/2">
					<Conectados />
				</div>
			</div>

			{showDeleteModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-80">
						<h3 className="text-lg font-semibold text-center mb-4">
							¿Estás seguro de que quieres eliminar esta publicación?
						</h3>
						<div className="flex justify-between">
							<button
								onClick={() => setShowDeleteModal(false)}
								className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
							>
								Cancelar
							</button>
							<button
								onClick={handleDeletePost}
								className="bg-red-600 text-white px-4 py-2 rounded"
							>
								Eliminar
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Publicacion;
