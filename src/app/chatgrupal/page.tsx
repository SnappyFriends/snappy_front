"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import Conectados from "@/components/Conectados";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { UserContext } from "@/context/UserContext";
import { timeAgo } from "@/helpers/timeAgo";
import { useSocket } from "@/helpers/useSocket";
import { GroupChats, IGroupMessage, IUserData } from "@/interfaces/types";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import CreateChat from "../crearchatgrupal/page";

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
  /* const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState(""); */
  const [groupId, setGroupId] = useState();
  const { userData } = useContext(UserContext);
  const [groupChat, setGroupChat] = useState<GroupChats | null>(null);
  const [message, setMessage] = useState("");
  const [groupMessages, setGroupMessages] = useState<IGroupMessage[]>([]);

  const { sendMessage } = useSocket(
    groupChat,
    null,
    undefined,
    setGroupMessages
  );

  const filterFriends = async () => {
    if (!userData) {
      return;
    }
    setIsAdding(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/follow/${userData?.id}/friends`
    );
    const data = await response.json();

    setFriendsList(data);
  };

  //useEffect para hacer un fetch a la cantidad de Chats Grupales
  useEffect(() => {
    if (!userData) {
      return;
    }

    (async () => {
      try {
        const chatsQuantity = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chat-groups/${userData.id}/chats`
        );
        const response = await chatsQuantity.json();
        if (Array.isArray(response) && response.length > 0) {
          const group = response[0];
          setHasGroupChats(true);
          setGroupId(group.group_id);
        } else {
          setHasGroupChats(false);
        }
      } catch {
        setHasGroupChats(false);
      }
    })();
  }, [groupId, userData]);

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
        console.log(groupMembers);
      } catch (error) {
        console.error("Error fetching group members:", error);
      }
    })();

    console.log("FETCH MEMBERS");
  }, [groupId]);

  /*  useEffect(() => {
    if (!userData) {
      return;
    }
    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/follow/${userData?.id}/friends/`
        );
        const data = await response.json();
        console.log("AMIGOS", data);
        console.log("MEMBERS", members);

        interface testUser {
          id: string;
          username: string;
          profile_image: string;
          user_type: string;
        }
        const filteredUsers = data.filter((friend: testUser) => {
          return !members.some((member) => member.id === friend.id);
        });
        console.log("FILTERED users", filteredUsers);

        setFriendsList(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    })();
  }, [userData, members]); */

  useEffect(() => {
    if (!groupId || !userData) {
      console.log(
        "Esperando a que groupId y userData tengan valores válidos..."
      );
      return;
    }
    (async (groupId) => {
      try {
        const responseGroupChats = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chat-groups/chats/${groupId}`
        );
        if (responseGroupChats.ok) {
          const groupChatData = await responseGroupChats.json();
          console.log("groupChatData", groupChatData);

          setGroupChat(groupChatData[0]);

          setGroupMessages(groupChatData[0].messages);
        }
      } catch {
        console.log("Hubo un error al traer la información del Chat Grupal");
      }
    })(groupId);
    console.log("FETCH USERS");
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
      console.log("USER", user);
      setMembers((members) => [...members, user]);
      setSearchQuery("");
      setIsAdding(false);
      console.log("members", members);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    if (!groupChat) {
      console.error("No chatId available");
      return;
    }

    if (!userData) {
      return;
    }

    const sendDate = timeAgo(new Date().toISOString());
    const newMessage = {
      send_date: sendDate,
      content: message,
      groupId: groupId,
      sender_id: userData.id,
      type: "text",
      is_anonymous: false,
      messageReceivers: members.map((member) => member.id),
    };

    try {
      const sendDate = timeAgo(new Date().toISOString());
      const messageData = {
        content: message,
        send_date: sendDate,
        sender: {
          user_id: userData.id,
          username: userData.username,
          fullname: userData.fullname,
          profile_image: userData.profile_image,
          user_type: userData.user_type,
        },
      };
      setGroupMessages((prevMessages) => [...prevMessages, messageData]);

      sendMessage(newMessage);

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
                  <div className="space-y-4">
                    {members.map((member, index) => (
                      <div
                        key={member.id || `member-${index}`}
                        className="flex items-center space-x-2"
                      >
                        <div className="relative w-10 h-10">
                          <Image
                            src={member.imgSrc || "/agregarfoto.png"}
                            alt={`Foto de perfil de ${member.user.username}`}
                            layout="fill"
                            className="rounded-full object-cover"
                          />
                        </div>
                        <span className="text-sm">{member.user.username}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={filterFriends}
                    className="bg-green-500 text-white w-full px-4 py-2 rounded-lg text-sm mt-4 hover:bg-green-600 transition"
                  >
                    Agregar Miembro
                  </button>

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
                            key={user.id || `user-${index}`}
                            className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-200 rounded-md"
                            onClick={() => addMemberToRoom(user)}
                          >
                            <div className="relative w-10 h-10">
                              <Image
                                src={user.imgSrc || "/agregarfoto.png"}
                                alt={`Foto de perfil de ${user.username}`}
                                layout="fill"
                                className="rounded-full object-cover"
                              />
                            </div>
                            <span className="text-sm">{user.username}</span>
                            <span className="text-xs text-gray-400">
                              {user.fullName}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:w-3/4 sm:w-full px-4 py-6 flex flex-col bg-gray-50 h-[calc(100vh-200px)] overflow-y-auto">
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

                  <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    {groupChat ? (
                      groupMessages.length > 0 ? (
                        groupMessages.map((uniqueMsg, index) => {
                          console.log(
                            "uniqueMessage",
                            uniqueMsg.sender?.user_id
                          );
                          const isSender =
                            uniqueMsg.sender?.user_id === userData?.id;
                          if (isSender) {
                            console.log(
                              "sender.user_id",
                              uniqueMsg.sender?.user_id,
                              "userData?.id",
                              userData?.id
                            );
                            console.log("is Sender existe", isSender);
                          } else console.log("is Sender no existe", isSender);

                          console.log("sender_id", uniqueMsg.sender?.user_id);
                          const divContainer = isSender ? (
                            <div
                              className="text-right"
                              key={`${uniqueMsg.sender?.user_id}-${index}`}
                            >
                              <div className="p-2 bg-blue-100 rounded-lg my-2">
                                <p>{uniqueMsg.sender?.username}</p>
                                <p>{uniqueMsg.content}</p>
                              </div>
                            </div>
                          ) : (
                            <div
                              className="text-left"
                              key={`${uniqueMsg.sender?.user_id}-${index}`}
                            >
                              <div className="p-2 bg-blue-100 rounded-lg my-2">
                                <p>{uniqueMsg.sender?.username}</p>
                                <p>{uniqueMsg.content}</p>
                              </div>
                            </div>
                          );

                          return divContainer;
                        })
                      ) : (
                        <p className="text-gray-400 text-center">
                          Aún no hay mensajes...
                        </p>
                      )
                    ) : (
                      <div className="flex-1 overflow-y-auto mt-4 px-4 py-3 bg-white rounded-lg">
                        <p className="text-center text-gray-400">
                          Inicia tu conversación en el chat
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="px-4 py-3 border-t flex items-center space-x-3">
                    <input
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
