"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import Conectados from "@/components/Conectados";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { UserContext } from "@/context/UserContext";
import { timeAgo } from "@/helpers/timeAgo";
import { GroupChats, IGroupMessage, IUserData } from "@/interfaces/types";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import CreateChat from "../crearchatgrupal/page";

import Cookies from "js-cookie";
import { io, Socket } from "socket.io-client";

// import { useSocket } from "@/helpers/useSocket";

interface User {
  id: string;
  username?: string;
  fullName?: string;
  imgSrc?: string;
  email?: string;
  profile_image: string;
  user: IUserData;
}

const ChatRoomView = () => {
  const [members, setMembers] = useState<User[]>([]);
  const [friendsList, setFriendsList] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAdding, setIsAdding] = useState(false);
  const [hasGroupChats, setHasGroupChats] = useState<boolean>(false);

  const { userData, groupId, setGroupId } = useContext(UserContext);
  const [groupChat, setGroupChat] = useState<GroupChats | null>(null);
  const [message, setMessage] = useState("");
  const [groupMessages, setGroupMessages] = useState<IGroupMessage[]>([]);

  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = Cookies.get("auth_token");
  const socketRef = useRef<Socket | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteGroup = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chat-groups/${groupId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        return;
      }
      setHasGroupChats(false);
      setGroupId(null);
      window.location.href = "/mensajeschatgrupal";
    } catch (error) {
      console.error("Error deleting chat group", error);
    }
  };

  useEffect(() => {
    const authToken = Cookies.get("auth_token");

    if (!authToken) {
      console.error("No auth token found in cookies");
      return;
    }

    const timeoutId = setTimeout(() => {
      socketRef.current = io(
        `${process.env.NEXT_PUBLIC_API_URL}/chat?token=${authToken}`,
        {
          auth: {
            token: authToken,
          },
          withCredentials: true,
          transports: ["websocket"],
        }
      );

      socketRef.current.on("connect", () => {
        console.log("WebSocket conectado");
      });

      socketRef.current.on("receiveGroupMessage", (newMessage) => {
        if (setGroupMessages) {
          setGroupMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });

      if (groupChat) {
        socketRef.current.emit("join_group_chat", groupChat);
      }
    }, 1500);
    return () => {
      clearTimeout(timeoutId);
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [token, groupChat]);

  const filterFriends = async () => {
    if (!userData) {
      return;
    }
    setIsAdding(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/follow/${userData?.id}/friends`
    );
    const data = await response.json();

    const groupMembers = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/group-members/${groupId}`
    );
    const parsedMembers = await groupMembers.json();

    const filteredFriends = data.filter(
      (friend: User) =>
        !parsedMembers.some((member: User) => member.user.id === friend.id)
    );

    setFriendsList(filteredFriends);
  };

  //useEffect para hacer un fetch a los miembros de un grupo.
  useEffect(() => {
    if (!groupId) return;

    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/group-members/${groupId}`
        );

        if (!response.ok) {
          console.error("Ocurrió un error al traer los miembros del grupo.");
          return;
        }

        const groupMembers = await response.json();

        setMembers(groupMembers);
        setNeedsUpdate(false);
      } catch (error) {
        console.error("Error fetching group members:", error);
      }
    })();
  }, [groupId, needsUpdate]);

  //useEffect para traerme los mensajes del chat con groupId
  useEffect(() => {
    if (!groupId || !userData) {
      console.log(
        "Esperando a que groupId y userData tengan valores válidos..."
      );
      return;
    }
    (async (groupId) => {
      console.log("GROUP ID previo al fetch", groupId);
      try {
        const responseGroupChats = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chat-groups/chats/${groupId}`
        );
        if (responseGroupChats.ok) {
          const groupChatData = await responseGroupChats.json();
          if (Array.isArray(groupChatData) && groupChatData.length > 0) {
            const group = groupChatData[0];
            setGroupChat(group);
            setGroupMessages(group.messages);
            setHasGroupChats(true);
          } else setHasGroupChats(false);
          console.log("GroupChatData en /chatGrupal ", groupChatData);
        }
      } catch {
        console.log("Hubo un error al traer la información del Chat Grupal");
      }
    })(groupId);
  }, [groupId, userData]);

  const addMemberToRoom = async (user: User) => {
    if (!members.some((m) => m.id === user.id)) {
      const responseObject = { user_id: user.id, group_id: groupId };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/group-members`,
        {
          method: "POST",
          body: JSON.stringify(responseObject),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await response.json();
      setMembers((members) => [...members, user]);
      setSearchQuery("");
      setIsAdding(false);
      setNeedsUpdate(true);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim() || !userData || !groupChat || !socketRef.current)
      return;

    const membersWithoutMe = members.filter(
      (member) => member.user.id != userData.id
    );

    const serverMessage = {
      username: userData.username,
      content: message,
      groupId: groupId,
      sender_id: userData.id,
      type: "text",
      is_anonymous: false,
      messageReceivers: membersWithoutMe.map((member) => member.user.id),
      send_date: timeAgo(new Date().toISOString()),
    };

    try {
      socketRef.current.emit("groupMessage", serverMessage);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <NavBar />

      <div className="flex flex-col lg:flex-row">
        <div className="hidden lg:flex flex-col w-64 bg-white p-6 space-y-10 fixed left-6 top-1/2 transform -translate-y-1/2">
          <Sidebar />
        </div>

        {hasGroupChats ? (
          <div className="lg:w-1/2 md:w-full ml-0 lg:ml-80 mt-12 lg:mt-32 max-w-[1100px]">
            <div className="flex items-center justify-center h-auto relative">
              <div className="flex w-full max-w-6xl rounded-lg bg-white shadow-md">
                <div className="lg:w-1/4 sm:w-full md:w-full h-[calc(100vh-200px)] border-r px-4 py-6 bg-gray-100 overflow-y-auto">
                  <h3 className="text-xl font-semibold mb-4">
                    Miembros de la Sala
                  </h3>

                  {/* Miembros de la sala */}
                  <div className="space-y-4">
                    {members.map((member, index) => (
                      <div
                        key={member?.user?.id || `member-${index}`}
                        className="flex items-center space-x-2"
                      >
                        <div className="relative w-10 h-10">
                          <Image
                            src={
                              member?.user?.profile_image || "/agregarfoto.png"
                            }
                            alt={`Foto de perfil de ${member.user?.username}`}
                            layout="fill"
                            className="rounded-full object-cover"
                          />
                        </div>
                        <span className="text-sm">{member.user?.username}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={filterFriends}
                    className="bg-green-500 text-white w-full px-4 py-2 rounded-lg text-sm mt-4 hover:bg-green-600 transition"
                  >
                    Agregar Miembro
                  </button>

                  {/* Agregar miembros al grupo */}
                  {isAdding && (
                    <div className="mt-4 max-h-60 overflow-y-auto bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold mb-3">
                        Selecciona un Miembro
                      </h4>
                      <input
                        type="text"
                        placeholder="Buscar usuario..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 mb-4"
                      />
                      <div>
                        {friendsList.map((user, index) => (
                          <div
                            key={user.user?.id || `user-${index}`}
                            className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-200 rounded-md"
                            onClick={() => addMemberToRoom(user)}
                          >
                            <div className="relative w-10 h-10">
                              <Image
                                src={user.profile_image || "/agregarfoto.png"}
                                alt={`Foto de perfil de ${user?.username}`}
                                layout="fill"
                                className="rounded-full object-cover"
                              />
                            </div>
                            <span className="text-sm">{user?.username}</span>
                            <span className="text-xs text-gray-400">
                              {user?.fullName}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:w-3/4 sm:w-full px-4 py-6 flex flex-col bg-gray-50 h-[calc(100vh-200px)] overflow-y-auto">
                  {/* Información del grupo */}
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <div className="relative w-12 h-12">
                        <Image
                          src="/agregarfoto.png"
                          alt="Foto de perfil de la sala"
                          layout="fill"
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <h1 className="text-xl font-semibold">
                          {groupChat?.name}
                        </h1>
                        <p className="text-sm text-gray-500">
                          {groupChat?.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Historial de mensajes */}
                  <div className="flex-1 overflow-y-auto mt-4 px-4 py-3 bg-white rounded-lg">
                    {groupChat ? (
                      groupMessages.length > 0 ? (
                        groupMessages.map((uniqueMsg, index) => {
                          const isSender =
                            uniqueMsg.sender?.user_id === userData?.id;

                          return (
                            <div
                              className={isSender ? "text-right" : "text-left"}
                              key={`${uniqueMsg.message_id}-${index}`}
                            >
                              <div
                                className={`p-2 ${
                                  isSender ? "bg-blue-100" : "bg-gray-200"
                                } rounded-lg my-2`}
                              >
                                <p className="font-semibold">
                                  {isSender
                                    ? "Tú"
                                    : uniqueMsg.sender.username ||
                                      "Desconocido"}
                                </p>
                                <p>{uniqueMsg?.content}</p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-gray-400 text-center">
                          Aún no hay mensajes...
                        </p>
                      )
                    ) : (
                      <p className="text-center text-gray-400">
                        Inicia tu conversación en el chat
                      </p>
                    )}
                  </div>

                  {/* Input para mandar mensajito */}
                  <div className="px-4 py-3 border-t flex items-center space-x-3">
                    <input
                      value={message}
                      type="text"
                      placeholder="Escribe un mensaje..."
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition"
                      onClick={handleSendMessage}
                    >
                      Enviar
                    </button>
                  </div>

                  {/* Botón y Modal para eliminar grupo */}
                  <button
                    onClick={openModal}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm mt-4 hover:bg-red-600 transition"
                  >
                    Eliminar Grupo
                  </button>
                  {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">
                          Confirmación
                        </h2>
                        <p className="mb-4">
                          ¿Estás seguro de que quieres eliminar este grupo?
                        </p>
                        <div className="flex justify-between">
                          <button
                            onClick={closeModal}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={handleDeleteGroup}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <CreateChat />
        )}

        <div className="hidden lg:flex flex-col w-80 space-y-6 absolute right-20 top-1/2 transform -translate-y-1/2">
          <Conectados />
        </div>
      </div>
    </div>
  );
};

export default ChatRoomView;
