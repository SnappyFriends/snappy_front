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
			const fetchUser = async () => {
				try {
					const user = await getUsersByUsername(username);
					if (user) {
						setUserTargetData(user);

						if (user.followers && user.followers.length > 0) {
							const isFollowing = user.followers.map(
								(follower: { id: string }) => {
									if (follower.id == userData?.id) return true;
									else return false;
								}
							);

							if (isFollowing) setFollowingState(true);
						}
					} else {
						return <NotFound />;
					}
				} catch (error) {
					console.error("Error al obtener los datos del usuario:", error);
				}
			};
			fetchUser();
		}
	}, [username, userData]);

	if (!userData) {
		return "Cargando...";
	}

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
              <p className="text-lg font-bold md:text-xl">{userData.following.length}</p>
              <p>Amigos</p>
            </article>
            <article className="text-center w-24 md:w-28">
              <p className="text-lg font-bold md:text-xl">{userData.followers.length}</p>
              <p>Seguidores</p>
            </article>
            <article className="text-center w-24 md:w-28">
              <p className="text-lg font-bold md:text-xl">{userData.posts.length}</p>
              <p>Publicaciones</p>
            </article>
          </div>
          <div className="px-2 text-center">
            <p>{userData.description}</p>
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
							href="/inprogress"
							className="px-4 py-2 text-white bg-black hover:bg-gray-800 rounded-md"
						>
							Pregunta anónima
						</Link>
					</div>
					<div className="w-full px-2 text-center">
						{userData.interests &&
							userData.interests.length > 0 && (
								<p>
									<span className="font-bold">Intereses: </span>
									{userData.interests
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
						<p>{userData.fullname} no tiene publicaciones.</p>
					</div>
				</section>
			</main>
			<div className="hidden md:flex flex-col w-80 space-y-6 absolute right-20 top-1/2 transform -translate-y-1/2">
				<Conectados />
			</div>
		</>
	);
};

export default ProfileView;
