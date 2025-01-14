"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { GroupChatsBeta } from "@/interfaces/types";
import { UserContext } from "@/context/UserContext";
import { timeAgo } from "@/helpers/timeAgo";
import { useRouter } from "next/navigation";
import CreateChat from "../crearchatgrupal/page";
import CreateChatGroupForm from "@/components/CrearChatGrupal";

const MensajesGrupales = () => {
  const [groupChats, setGroupChats] = useState<GroupChatsBeta[]>();
  const [isGoingToAdd, setIsGoingToAdd] = useState(false);

  const { userData, setGroupId } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchGroupChats = async () => {
      if (!userData?.id) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chat-groups/${userData.id}/chats`
        );

        const data = await response.json();

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

  const pushToCreateForm = () => {
    setIsGoingToAdd(true);
  };

  const handleGroupClick = (groupId: string) => {
    setGroupId(groupId);
    router.push(`/chatgrupal?group_id=${groupId}`);
  };

  return (
    <>

      <div className="flex min-h-screen relative">

        {isGoingToAdd ? (
          <CreateChatGroupForm />
        ) : (
          <div className="flex-1 flex justify-center mt-20">
            <div className="w-full md:w-2/4 p-6">
              <nav className="h-16 flex flex-col justify-center items-center space-y-4">
                <div
                  onClick={pushToCreateForm}
                  className="flex items-center justify-center space-x-2 text-gray-800 hover:text-blue-500 transition"
                  title="Ir al enlace"
                >
                  <Image
                    src="/mas.jpg"
                    width={24}
                    height={24}
                    alt="Icono personalizado"
                    className="cursor-pointer"
                  />
                  <span className="text-sm font-medium">
                    Crear nuevo chat grupal
                  </span>
                </div>

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

                  {groupChats === undefined ? (
                    <>
                      <section className="h-20 flex justify-between items-center px-4 border-b border-[#EEEEEE] cursor-pointer hover:bg-gray-100 transition">
                        Loading...
                      </section>
                      {/* HACER EL MISMO HASGROUP CHATS QUE EN EL OTRO ARCHIVO */}
                      <div>No existen chats grupales.</div>
                    </>
                  ) : groupChats.length === 0 ? (
                    <CreateChat />
                  ) : (
                    groupChats
                      .sort((a, b) => {
                        const lastMessageA =
                          a.group.messages && a.group.messages.length > 0
                            ? a.group.messages[a.group.messages.length - 1]
                            : null;
                        const lastMessageB =
                          b.group.messages && b.group.messages.length > 0
                            ? b.group.messages[b.group.messages.length - 1]
                            : null;

                        if (lastMessageA && lastMessageB) {
                          return (
                            new Date(lastMessageB.send_date).getTime() -
                            new Date(lastMessageA.send_date).getTime()
                          );
                        }

                        return 0;
                      })
                      .map((groupChat) => {
                        const lastMessage =
                          groupChat.group.messages &&
                          groupChat.group.messages.length > 0
                            ? groupChat.group.messages[
                                groupChat.group.messages.length - 1
                              ]
                            : null;

                        return (
                          <section
                            key={groupChat.group?.group_id}
                            className="h-20 flex justify-between items-center px-4 border-b border-[#EEEEEE] cursor-pointer hover:bg-gray-100 transition"
                            onClick={() =>
                              handleGroupClick(groupChat.group?.group_id)
                            }
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
                                    new Date(
                                      lastMessage.send_date
                                    ).toISOString()
                                  )}`
                                : "Sin mensajes recientes"}
                            </div>
                          </section>
                        );
                      })
                  )}
                </div>
              </main>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default MensajesGrupales;
