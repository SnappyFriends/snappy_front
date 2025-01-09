"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Conectados from "@/components/Conectados";
import Sidebar from "@/components/Sidebar";
import { GroupChatsBeta } from "@/interfaces/types";
import { UserContext } from "@/context/UserContext";
import { timeAgo } from "@/helpers/timeAgo";
import { useRouter } from "next/navigation";
import CreateChat from "../crearchatgrupal/page";

const MensajesGrupales = () => {
  const [groupChats, setGroupChats] = useState<GroupChatsBeta[]>([]);

  const { userData } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchGroupChats = async () => {
      if (!userData?.id) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chat-groups/${userData.id}/chats`
        );

        const data = await response.json();
        console.log("DATA dentro del UseEffect", data);

        if (Array.isArray(data) && data.length > 0) {
          setGroupChats(data);
        } else {
          console.error("No se encontraron chats grupales para este usuario");
        }
      } catch (error) {
        console.error(
          "Error al obtener los chats grupales del usuario:",
          error
        );
      }
    };

    fetchGroupChats();
  }, [userData]);

  const handleGroupClick = (groupId: string) => {
    router.push(`/chatgrupal?group_id=${groupId}`);
  };

  if (!groupChats) return "Cargando...";

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
                  placeholder="Buscar chat grupal"
                />
                <button
                  type="submit"
                  className="border border-gray-500 h-10 w-11 border-l-transparent rounded-full rounded-s-none"
                  aria-label="Buscar chat grupal"
                  title="Buscar chat grupal"
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
                  Chats Grupales
                </h2>
                {groupChats.length === 0 ? (
                  <CreateChat />
                ) : (
                  (console.log("GroupChats", groupChats),
                  groupChats.map((groupChat) => {
                    const lastMessage =
                      groupChat.group.messages &&
                      groupChat.group.messages.length > 0
                        ? groupChat.group.messages[
                            groupChat.group.messages.length - 1
                          ]
                        : null;

                    console.log("ULTIMO MENSAJE", lastMessage);

                    return (
                      <section
                        key={groupChat.group_id}
                        className="h-20 flex justify-between items-center px-4 border-b border-[#EEEEEE] cursor-pointer hover:bg-gray-100 transition"
                        onClick={() => handleGroupClick(groupChat.group_id)}
                      >
                        <div className="flex items-center space-x-4">
                          <div>
                            <Image
                              src="/agregarfoto.png"
                              width={1000}
                              height={1000}
                              alt="Imagen del chat grupal"
                              className="rounded-full w-16 h-16 object-cover"
                            />
                          </div>
                          <div>
                            <h2 className="font-bold text-sm text-gray-900">
                              {groupChat.group.name}
                            </h2>
                            <p className="text-xs text-gray-500">
                              {lastMessage
                                ? `${lastMessage.content}`
                                : "Sin mensajes recientes"}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {lastMessage
                            ? `${timeAgo(
                                new Date(lastMessage.send_date).toISOString()}`
                            : "Sin mensajes recientes"}
                        </div>
                      </section>
                    );
                  }))
                )}
              </div>
            </main>
          </div>
        </div>

        <div className="hidden md:flex flex-col w-80 space-y-6 absolute right-20 top-1/2 transform -translate-y-1/2">
          <Conectados />
        </div>
      </div>
    </>
  );
};

export default MensajesGrupales;
