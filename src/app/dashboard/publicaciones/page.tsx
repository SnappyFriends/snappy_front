"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Post, Comment } from "@/interfaces/types";
import Link from "next/link";
import { timeAgo } from "@/helpers/timeAgo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "@/context/UserContext";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [filter, setFilter] = useState<string>("");
  const { token } = useContext(UserContext);

  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}`;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${endpoint}/posts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(
            `Error al obtener publicaciones: ${response.statusText}`
          );
        }
        const data = await response.json();

        const sortedPosts = data.sort((a: Post, b: Post) => {
          return (
            new Date(b.creation_date).getTime() -
            new Date(a.creation_date).getTime()
          );
        });

        setPosts(sortedPosts);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchPosts();
  }, []);

  const deletePost = async (postId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${endpoint}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("No se pudo eliminar la publicación.");
      setPosts(posts.filter((post) => post.post_id !== postId));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!selectedPost) return;
    try {
      setCommentLoading(true);
      const response = await fetch(`${endpoint}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("No se pudo eliminar el comentario.");
      const updatedComments = selectedPost.comments.filter(
        (comment) => comment.id !== commentId
      );
      setSelectedPost({ ...selectedPost, comments: updatedComments });
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setCommentLoading(false);
    }
  };

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const filteredPosts = posts.filter((post) => {
    return post.user.username.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className="flex flex-col items-center w-full h-auto">
      <h1 className="text-center text-3xl font-bold mb-5">Publicaciones</h1>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="p-2 mb-5 rounded-md border text-center"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex flex-wrap justify-center gap-10 px-4 w-auto mb-20">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.post_id}
              className="p-2 bg-white flex flex-col items-center"
            >
              <Link href={`/publicacion/${post.post_id}`}>
                <div className="relative w-40 h-40 mb-1">
                  <Image
                    src={post.fileUrl}
                    alt="Post"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              </Link>
              <div className="text-gray-700 text-center">
                <p>{post.content}</p>
                <p className="text-sm text-gray-500">
                  {timeAgo(post.creation_date)}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>{post.user.username}</strong>{" "}
                  {`(${post.user.user_type})`}
                </p>
                <div className="flex justify-center items-center gap-4 mt-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <FontAwesomeIcon icon={faHeart} size="lg" />
                    <span className="ml-1">{post.reactions.length}</span>
                  </div>
                  <button
                    onClick={() => openModal(post)}
                    disabled={loading}
                    className="flex items-center text-sm text-gray-500"
                  >
                    <FontAwesomeIcon icon={faComment} size="lg" />
                    <span className="ml-1">{post.comments.length}</span>
                  </button>
                </div>
              </div>
              <button
                onClick={() => deletePost(post.post_id)}
                disabled={loading}
                className="mt-1 w-auto py-1 px-2 text-red-500 rounded-lg disabled:opacity-50"
              >
                {loading ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          ))
        ) : (
          <p>No hay publicaciones para este usuario.</p>
        )}
      </div>

      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-8 rounded-lg w-2/3 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Comentarios</h2>
              <button
                onClick={closeModal}
                className="text-gray-700 text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            {selectedPost.comments.length === 0 ? (
              <p>No hay comentarios.</p>
            ) : (
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Foto</th>
                    <th className="px-4 py-2 text-left">Usuario</th>
                    <th className="px-4 py-2 text-left">Comentario</th>
                    <th className="px-4 py-2 text-left">Fecha</th>
                    <th className="px-4 py-2 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPost.comments.map((comment: Comment) => (
                    <tr key={comment.id} className="border-b">
                      <td className="px-4 py-2">
                        <Image
                          src={comment.user.profile_image}
                          alt="Profile"
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                      </td>
                      <td className="px-4 py-2">{comment.user.username}</td>
                      <td className="px-4 py-2">{comment.content}</td>
                      <td className="px-4 py-2">
                        {timeAgo(comment.comment_date)}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => deleteComment(comment.id)}
                          disabled={commentLoading}
                          className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 disabled:opacity-50"
                        >
                          {commentLoading ? "Eliminando..." : "Eliminar"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
