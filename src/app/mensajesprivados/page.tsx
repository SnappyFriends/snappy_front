"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Conectados from "@/components/Conectados";
import Sidebar from "@/components/Sidebar";
import { Chats } from "@/interfaces/types";
import { UserContext } from "@/context/UserContext";
import { timeAgo } from "@/helpers/timeAgo";
import Link from "next/link";

const MensajesPrivados = () => {
  const [chats, setChats] = useState<Chats[]>([]);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const fetchChats = async () => {
      if (!userData?.id) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chats/user-chats/${userData.id}`
        );
        const data = await response.json();
        if (data?.length > 0) {
          setChats(data);
        } else {
          console.error("No se encontraron chats para este usuario");
        }
      } catch (error) {
        console.error("Error al obtener los chats del usuario:", error);
      }
    };

    fetchChats();
  }, [userData]);

  if (!chats) return "Cargando...";

  return (
    <>
      <NavBar />

      <div className="flex min-h-screen relative">
        <div className="hidden md:flex flex-col w-64 bg-white p-6 space-y-10 fixed left-6 top-1/2 transform -translate-y-1/2">
          <Sidebar />
        </div>

        <div className="flex-1 flex justify-center mt-20">
          <div className="w-full md:w-2/4 p-6">
            <nav className="h-16 flex justify-center items-center">
              <form className="w-full flex">
                <input
                  type="text"
                  className="border border-gray-500 border-r-transparent rounded-full rounded-e-none h-10 w-full px-4"
                  placeholder="Buscar chat"
                />
                <button
                  type="submit"
                  className="border border-gray-500 h-10 w-11 border-l-transparent rounded-full rounded-s-none"
                  aria-label="Buscar chat"
                  title="Buscar chat"
                >
                  <Image
                    src="/lupa.png"
                    width={20}
                    height={20}
                    alt="Buscar"
                    className="cursor-pointer"
                  />
                </button>
              </form>
            </nav>

            <main>
              <div>
                <h2 className="text-center my-2 text-lg font-semibold text-gray-800">
                  Mensajes
                </h2>
                {chats.length === 0 ? (
                  <p className="text-center text-gray-500 mt-4">
                    No tienes mensajes aún
                  </p>
                ) : (
                  chats
                    .sort((a, b) => {
                      const lastMessageA =
                        a.messages.length > 0
                          ? a.messages[a.messages.length - 1]
                          : null;
                      const lastMessageB =
                        b.messages.length > 0
                          ? b.messages[b.messages.length - 1]
                          : null;
                      if (!lastMessageA || !lastMessageB) return 0;
                      return (
                        new Date(lastMessageB.send_date).getTime() -
                        new Date(lastMessageA.send_date).getTime()
                      );
                    })
                    .map((chat) => {
                      const currentUserId = userData?.id;

                      const receiver = chat.participants.find(
                        (participant) => participant.id !== currentUserId
                      );

                      if (!receiver) return null;

                      const sortedMessages = [...chat.messages].sort(
                        (a, b) =>
                          new Date(b.send_date).getTime() -
                          new Date(a.send_date).getTime()
                      );

                      const lastMessage =
                        sortedMessages.length > 0 ? sortedMessages[0] : null;

                      return (
                        <section
                          key={chat.id}
                          className="h-20 flex justify-between items-center px-4 border-b border-[#EEEEEE]"
                        >
                          <Link
                            href={`/chat/${receiver.username}`}
                            className="flex items-center w-full"
                          >
                            <div className="flex space-x-4 items-center w-full">
                              <div>
                                <Image
                                  src={
                                    receiver.profile_image || "/agregarfoto.png"
                                  }
                                  width={64}
                                  height={64}
                                  alt="fotodeperfil"
                                  className="rounded-full w-16 h-16 object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <h2 className="font-bold text-sm text-gray-900">
                                  {receiver.username}
                                </h2>
                                <p className="text-xs text-gray-500">
                                  {lastMessage
                                    ? lastMessage.content
                                    : "Sin mensajes aún"}
                                </p>
                              </div>
                              <div className="text-sm text-gray-500">
                                {lastMessage
                                  ? timeAgo(
                                      new Date(
                                        lastMessage.send_date
                                      ).toISOString()
                                    )
                                  : ""}
                              </div>
                            </div>
                          </Link>
                        </section>
                      );
                    })
                )}
              </div>
            </main>
          </div>
        </div>

        <div className="hidden md:flex flex-col w-80 space-y-6 absolute right-20 top-[45%] transform -translate-y-1/2">
          <Conectados />
        </div>
      </div>
    </>
  );
};

export default MensajesPrivados;
