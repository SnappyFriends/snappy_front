"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Conectados from "@/components/Conectados";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { Post } from "@/interfaces/types";

const SocialFeedView = () => {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
			const data = await response.json();
			setPosts(data);
		};
		fetchPosts();
	}, []);

	return (
		<>
			<NavBar />
			<div className="flex flex-row">
				<div className="hidden md:flex flex-col w-64 bg-white p-6 space-y-10 fixed left-6 top-1/2 transform -translate-y-1/2">
					<Sidebar />
				</div>

				<div className="flex-1 flex flex-col items-center max-w-5xl p-4 md:ml-72 lg:ml-80 mt-10">
					<div className="flex justify-center space-x-6 mb-6">
						<div className="relative w-14 h-14">
							<Link href="/crear-story">
								<Image
									src="/agregarusuario.png"
									alt="Agregar Usuario"
									layout="fill"
									className="rounded-full object-cover"
								/>
							</Link>
						</div>

						{[...Array(4)].map((_, index) => (
							<div key={index} className="relative w-14 h-14">
								<Image
									src="/agregarfoto.png"
									alt={`Foto ${index + 1}`}
									layout="fill"
									className="rounded-full object-cover"
								/>
							</div>
						))}
					</div>

					<div className="flex justify-between w-full max-w-md mb-6 border-b">
						<button className="flex-1 py-2 text-center text-gray-500 hover:text-black">
							Siguiendo
						</button>
						<button className="flex-1 py-2 text-center text-black font-bold border-b-2 border-black">
							Para ti
						</button>
						<button className="flex-1 py-2 text-center text-gray-500 hover:text-black">
							Favoritos
						</button>
					</div>

					<div className="w-full max-w-md space-y-4">
						{posts.map((post) => (
							<div key={post.post_id} className="w-full max-w-md space-y-4">
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
												{new Date(post.creation_date).toLocaleString()}{" "}
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
										{post.reactions.length} Reacciones
									</p>
									<p className="text-xs text-gray-500">
										{post.comments.length} Comentarios
									</p>
									<Link href={`/publicacion/${post.post_id}`}>
										<button className="bg-blue-500 text-white px-4 py-1 rounded-full text-xs">
											Comentar
										</button>
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="hidden md:flex flex-col w-80 space-y-6 absolute right-20 top-1/2 transform -translate-y-1/2">
					<Conectados />
				</div>
			</div>
		</>
	);
};

export default SocialFeedView;
