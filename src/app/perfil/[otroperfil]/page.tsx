"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getUsersByUsername } from "@/helpers/users";
import Conectados from "@/components/Conectados";
import Sidebar from "@/components/Sidebar";
import NotFound from "@/app/not-found";
import { IUsernameData } from "@/interfaces/types";
import VerifiedAccount from "@/components/VerifiedAccount";
import NavBar from "@/components/NavBar";
import { UserContext } from "@/context/UserContext";
import { showCustomToast } from "@/components/Notificacion";

// import { formatDistanceToNow } from "date-fns";

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
  const [followingState, setFollowingState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"followers" | "following" | null>(
    null
  );

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
		} else {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/follow/${userData?.id}/${userTargetData?.id}`,
				{
					method: "DELETE",
				}
			);

			if (!response.ok)
				throw new Error(`Ocurrió un error al intentar seguir a este usuario.`);

			showCustomToast("Snappy", "Dejaste de seguir a este usuario.", "success");
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
				const isFollowing = userTargetData.followers.map(
					(follower: { id: string }) => {
						if (follower.id == userTargetData.id) return true;
						else return false;
					}
				);

				if (isFollowing) setFollowingState(true);
			}
		}
	}, [userTargetData]);

	if (!userTargetData) return "Cargando...";

	// const lastLoginDate = userTargetData.last_login_date
	//   ? new Date(userTargetData.last_login_date)
	//   : null;

	// const timeAgo = lastLoginDate
	//   ? formatDistanceToNow(lastLoginDate, { addSuffix: true })
	//   : "Fecha no disponible";

  return (
    <>
      <Sidebar />
      <NavBar />
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
								followingState
									? "bg-gray-500 hover:bg-gray-600"
									: "bg-blue-500 hover:bg-blue-600"
							}`}
						>
							{followingState ? "Siguiendo" : "Seguir"}
						</button>
						<Link
							href={`/chat/${userTargetData.username}`}
							className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md"
						>
							Enviar mensaje
						</Link>
						<Link
							href="/inprogress"
							className="px-4 py-2 text-white bg-black hover:bg-gray-800 rounded-md"
						>
							Pregunta anónima
						</Link>
					</div>
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
					{/* <div className="flex-1 flex flex-col items-center max-w-6xl px-4 md:px-8 mt-10 mx-auto">
            <div className="flex justify-center space-x-6 mb-6">
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <button title="Ver mis historias">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden">
                    <Image
                      src={userTargetData?.profile_image || "/user.png"}
                      alt="Foto de perfil"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full"
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
              </div>
            </div>
          </div> */}
          <div className="flex flex-wrap justify-center gap-4">
            <p>{userTargetData.fullname} no tiene publicaciones.</p>
          </div>
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
              {(modalType === "following"
                ? userTargetData.following
                : userTargetData.followers
              ).length > 0 ? (
                <div className="space-y-4">
                  {(modalType === "following"
                    ? userTargetData.following
                    : userTargetData.followers
                  ).map((user) => (
                    <div
                      key={user.id}
                      className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={userTargetData.profile_image}
                          alt={userTargetData.username}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <p>{userTargetData.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No tiene {modalType === "following" ? "seguidos" : "seguidores"}.
                </p>
              )}
            </div>
          </div>
        )}
      </main>
      <div className="hidden md:flex flex-col w-80 space-y-6 absolute right-20 top-1/2 transform -translate-y-1/2">
        <Conectados />
      </div>
    </>
  );
};


export default ProfileView;
