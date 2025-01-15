"use client";

import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { timeAgo } from "@/helpers/timeAgo";
import VerifiedAccount from "./VerifiedAccount";
import PostDetails from "./PostDetails";
import { showCustomToast } from "./Notificacion";
import {useRouter} from "next/navigation";

interface User {
  id: string;
  username: string;
  fullname: string;
  profile_image: string;
  description?: string;
  interests?: { name: string }[];
}
interface IUserSeguidos {
  id: string;
  username: string;
  profile_image: string;
  user_type: string;
}

interface Story {
  story_id: string;
  user: User;
  fileUrl: string;
  creation_date: string;
  content: string;
}

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

export default function PerfilComponent() {
  
  const { userData } = useContext(UserContext);
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [isFollowedModalOpen, setIsFollowedModalOpen] =
    useState<boolean>(false);
  const [followed, setFollowed] = useState<IUserSeguidos[]>([]);

  const [isFollowingModalOpen, setIsFollowingModalOpen] =
    useState<boolean>(false);
  const [following, setFollower] = useState<User[]>([]);
 const router = useRouter();

  const fetchFollowers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/follow/${userData?.id}/followers`
      );
      if (!response.ok) {
        throw new Error("Error al obtener seguidores");
      }
      const data: User[] = await response.json();
      setFollower(data);
    } catch (error) {
      console.error("Error fetching friends:", error);
      alert("Hubo un problema al cargar tus seguidores");
    }
  };

  const fetchFollowed = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/follow/${userData?.id}/following`
      );
      if (!response.ok) {
        throw new Error("Error al obtener seguidos");
      }
      const data: IUserSeguidos[] = await response.json();
      setFollowed(data);
    } catch (error) {
      console.error("Error fetching friends:", error);
      alert("Hubo un problema al cargar tus seguidos");
    }
  };



  const removeFollowed = async (followedId: string ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/follow/${userData?.id}/${followedId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error al eliminar al seguido");
      }
      await fetchFollowed();
      showCustomToast("Snappy", "Usuario eliminado", "success");
    } catch (error) {
      console.error("Error removing followed user:", error);
      showCustomToast("Snappy", "Hubo un problema al eliminar", "error");
    }
  };

  const removeFollower = async (id:string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/follow/${id}/${userData?.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Error al eliminar al seguidor");
      }
      await fetchFollowers();
      showCustomToast("Snappy", "Seguidor eliminado", "success");
      router.push("/miperfil");
    } catch (error) {
      console.error("Error removing follower user:", error);
      showCustomToast("Snappy", "Hubo un problema al eliminar", "error");
    }
  };

  const openFriendsModal = async () => {
    await fetchFollowed();
    setIsFollowedModalOpen(true);
  };

  const closeFriendsModal = () => {
    setIsFollowedModalOpen(false);
  };

  const openFollowingModal = async () => {
    await fetchFollowers();
    setIsFollowingModalOpen(true);
  };

  const closeFollowingModal = () => {
    setIsFollowingModalOpen(false);
  };

  useEffect(() => {
    if (userData) {
      fetchUserStories();
    }
  }, [userData]);

  const fetchUserStories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stories`
      );
      const data: Story[] = await response.json();

      const currentTime = new Date().getTime();
      const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000;

      const userStories = data
        .filter(
          (story) =>
            story.user.id === userData?.id &&
            new Date(story.creation_date).getTime() >= twentyFourHoursAgo
        )
        .sort((a, b) => {
          return (
            new Date(b.creation_date).getTime() -
            new Date(a.creation_date).getTime()
          );
        });

      setStories(userStories);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  const openModal = (story: Story): void => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setSelectedStory(null);
    setIsModalOpen(false);
  };

  const openFirstStory = (): void => {
    if (stories.length > 0) {
      openModal(stories[0]);
    }
  };

  const deleteStory = async (storyId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stories/${storyId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setStories((prevStories) =>
          prevStories.filter((story) => story.story_id !== storyId)
        );
        closeModal();
        alert("Historia eliminada");
      } else {
        alert("Error al eliminar la historia");
      }
    } catch (error) {
      console.error("Error deleting story:", error);
      alert("Hubo un error al intentar eliminar la historia");
    }
  };

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

  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center pt-40">
      <section className="flex flex-col justify-center items-center gap-3 md:gap-4 pt-3 md:pt-4 px-4">
        <div className="w-32 h-32 md:w-40 md:h-40 lg:w-60 lg:h-60 rounded-full overflow-hidden border-4 border-black shadow-md">
          <Image
            src={userData.profile_image}
            alt="Foto de perfil"
            width={600}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="text-lg font-bold md:text-xl lg:text-2xl">
          {userData.fullname}{" "}
          {userData?.user_type === "premium" ? <VerifiedAccount /> : ""}
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          <article className="text-center w-24 md:w-28">
            <button onClick={openFriendsModal}>
              <p className="text-lg font-bold md:text-xl">
                {userData.following.length}
              </p>
              <p>Seguidos</p>
            </button>
          </article>
          <article className="text-center w-24 md:w-28">
            <button onClick={openFollowingModal}>
              <p className="text-lg font-bold md:text-xl">
                {userData.followers.length}
              </p>
              <p>Seguidores</p>
            </button>
          </article>
          <article className="text-center w-24 md:w-28">
            <p className="text-lg font-bold md:text-xl">
              {userData.posts.length}
            </p>
            <p>Publicaciones</p>
          </article>
        </div>
        <div className="px-2 text-center">
          <p>{userData.description}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {userData?.user_type === "premium" ? (
            <Link
              href="/pasareladepago"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
            >
              Tu membresía
            </Link>
          ) : (
            <Link
              href="/pasareladepago"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
            >
              Verificar cuenta
            </Link>
          )}
          <Link
            href="/editarperfil"
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700"
          >
            Editar perfil
          </Link>
        </div>
        <div className="w-full px-2 text-center">
          {userData.interests && userData.interests.length > 0 && (
            <p>
              <span className="font-bold">Intereses: </span>
              {userData.interests.map((interest) => interest.name).join(", ")}
            </p>
          )}
        </div>
        <div className="flex-1 flex flex-col items-center max-w-6xl px-4 md:px-8 mx-auto">
          <div className="flex justify-center space-x-6 mb-6">
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <button title="Ver mis historias">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden">
                  <Image
                    src={userData?.profile_image || "/user.png"}
                    alt="Foto de perfil"
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                    onClick={openFirstStory}
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center">
                  <Link href={"/crear-story"}>
                    <Image
                      src="/addhistoria.png"
                      alt="Añadir historia"
                      width={20}
                      height={20}
                      className="object-cover"
                    />
                  </Link>
                </div>
              </button>

              {isModalOpen && selectedStory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-3xl h-120 flex flex-col relative">
                    <button
                      className="absolute top-2 right-2 text-black font-bold"
                      onClick={closeModal}
                    >
                      X
                    </button>
                    <div className="flex justify-between items-center h-96">
                      <button
                        className="text-lg font-bold text-gray-700 hover:text-black"
                        onClick={() => {
                          const currentIndex = stories.findIndex(
                            (s) => s.story_id === selectedStory.story_id
                          );
                          const prevIndex =
                            currentIndex > 0
                              ? currentIndex - 1
                              : stories.length - 1;
                          setSelectedStory(stories[prevIndex]);
                        }}
                      >
                        &#8249;
                      </button>
                      <div className="relative w-4/5 h-96">
                        <Image
                          src={selectedStory.fileUrl}
                          alt="Story image"
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <button
                        className="text-lg font-bold text-gray-700 hover:text-black"
                        onClick={() => {
                          const currentIndex = stories.findIndex(
                            (s) => s.story_id === selectedStory.story_id
                          );
                          const nextIndex =
                            currentIndex < stories.length - 1
                              ? currentIndex + 1
                              : 0;
                          setSelectedStory(stories[nextIndex]);
                        }}
                      >
                        &#8250;
                      </button>
                    </div>
                    <div className="mt-4 flex flex-col items-center text-center">
                      <h3 className="text-lg font-bold">
                        {selectedStory.user.username}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {timeAgo(selectedStory.creation_date)}
                      </p>
                      <p className="text-sm max-w-lg">
                        {selectedStory.content}
                      </p>
                      <button
                        onClick={() => deleteStory(selectedStory.story_id)}
                        className="mt-4 px-4 py-2 text-red-600 rounded-md"
                      >
                        Eliminar Historia
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-6">
        {userData.posts.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4 max-w-6xl">
            {userData.posts.map((post) => (
              <div
                key={post.post_id}
                className="relative w-[calc(50%-8px)] md:w-[calc(33.333%-12px)] lg:w-[calc(25%-16px)] aspect-square"
              >
                
                <Image
                  src={post.fileUrl}
                  alt={`Imagen del post ${post.post_id}`}
                  width={500}
                  height={500}
                  className="object-cover rounded-md hover:opacity-80"
                  onClick={() => fetchPostDetails(post.post_id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tienes publicaciones aún.</p>
        )}
      </section>

      {selectedPost && (
        <PostDetails post={selectedPost} close={closePostDetails} />
      )}

      {isFollowedModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg flex flex-col relative">
            <button
              className="absolute top-2 right-2 text-black font-bold"
              onClick={closeFriendsModal}
            >
              X
            </button>
            <h2 className="text-lg font-bold mb-4">Tus Seguidos</h2>
            {followed.length > 0 ? (
              <div className="space-y-4">
                {followed.map((followedUser) => (
                  <div
                    key={followedUser.id || followedUser.username}
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
                  >
                     <Link
												href={`/perfil/${followedUser.username}`}
												className="text-black hover:underline"
											>
                    <div className="flex items-center gap-3">
                      <Image
                        src={followedUser.profile_image}
                        alt={followedUser.username}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <p>{followedUser.username}</p>
                    </div>
                    </Link>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => {
                        removeFollowed(followedUser.id);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No sigues a nadie aún.</p>
            )}
          </div>
        </div>
      )}

      {isFollowingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg flex flex-col relative">
            <button
              className="absolute top-2 right-2 text-black font-bold"
              onClick={closeFollowingModal}
            >
              X
            </button>
            <h2 className="text-lg font-bold mb-4">Tus Seguidores</h2>
            {following.length > 0 ? (
              <div className="space-y-4">
                {following.map((follower) => (
                  <div
                    key={follower.id || follower.username}
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
                  >
                     <Link
												href={`/perfil/${follower.username}`}
												className="text-black hover:underline"
											>
                    <div className="flex items-center gap-3">
                      <Image
                        src={follower.profile_image}
                        alt={follower.username}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <p>{follower.username}</p>
                      </div>
                      </Link>
                      <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => {
                        removeFollower(follower.id);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Aún no tienes seguidores.</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
