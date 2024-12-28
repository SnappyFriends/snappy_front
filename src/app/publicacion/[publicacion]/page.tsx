"use client";

import React, { useContext, useEffect, useState } from "react";
import Conectados from "@/components/Conectados";
import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/NavBar";
import { Post } from "@/interfaces/types";
import Image from "next/image";
import { UserContext } from "@/context/UserContext";
import { showCustomToast } from "@/components/Notificacion";

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
	const { userData } = useContext(UserContext);

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
	}, [uuid]);

	const handleCommentSubmit = async () => {
		if (!comment.trim()) return;

        if(!userData) return;

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

	if (loading) {
		return <div>Cargando...</div>;
	}

	if (!post) {
		return <div>Publicación no encontrada</div>;
	}

	return (
		<>
			<NavBar />
			<div className="flex flex-row">
				<div className="hidden md:flex flex-col w-64 bg-white p-6 space-y-10 fixed left-6 top-1/2 transform -translate-y-1/2">
					<Sidebar />
				</div>

				<div className="flex-1 flex flex-col items-center max-w-5xl p-4 md:ml-72 lg:ml-80 mt-10">
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
										{new Date(post.creation_date).toLocaleString()}
									</p>
								</div>
							</div>
							<button className="bg-green-500 text-white px-4 py-1 rounded-full text-sm">
								Seguir
							</button>
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
							<p className="text-xs text-gray-500">
								{post.reactions?.length} Reacciones
							</p>
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
		</>
	);
};

export default Publicacion;
