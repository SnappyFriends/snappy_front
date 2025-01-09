"use client";

import Conectados from "@/components/Conectados";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { UserContext } from "@/context/UserContext";
import { timeAgo } from "@/helpers/timeAgo";
import { snappUsers } from "@/helpers/users";
import { useSocket } from "@/helpers/useSocket";
import { Chats, IMessage } from "@/interfaces/types";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface IUserAPIResponse {
  username: string;
  id: string;
  user_type?: string;
  fullname?: string;
  chats?: Chats[];
  following?: { id: string; username: string; profile_image: string }[];
  followers?: { id: string; username: string; profile_image: string }[];
}

const ChatView = () => {
  const [userList, setUserList] = useState<IUserAPIResponse[]>([]);
  const [randomUser, setRandomUser] = useState<IUserAPIResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRequestSent, setIsRequestSent] = useState<boolean>(false);
  const [sentRequests, setSentRequests] = useState<Set<string>>(
    new Set<string>()
  );
  const [chat, setChat] = useState<Chats | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { userId, userData } = useContext(UserContext);
  const { sendMessage } = useSocket(null, chat, setMessages, undefined);

  const getPrivateChatAndMessages = useCallback(async () => {
    try {
      const responseChats = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chats/${randomUser?.id}/${userId}`
      );
      if (responseChats.ok) {
        const chatData = await responseChats.json();

        const responseMessages = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chats/chat/${chatData.id}`
        );
        const messagesData = await responseMessages.json();

        setChat(messagesData);
        setMessages(messagesData.messages);
      }
    } catch (error) {
      console.error("Error buscando o creando el chat:", error);
    }
  }, [randomUser?.id, userId]);

  useEffect(() => {
    const savedRequests = localStorage.getItem("sentRequests");
    if (savedRequests) {
      setSentRequests(new Set(JSON.parse(savedRequests)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sentRequests", JSON.stringify([...sentRequests]));
  }, [sentRequests]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      try {
        const users: IUserAPIResponse[] = await snappUsers(userId);

        setUserList(users);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  const handleSendMessage = async (receiverId: string) => {
    if (!message.trim()) {
      console.error("Message is empty");
      return;
    }
    if (!userData) {
      console.error("No user data available");
      return;
    }
    try {
      let chatId = chat?.id;

      if (!chat) {
        const users = [receiverId, userId];
        const createChatResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chats`,
          {
            method: "POST",
            body: JSON.stringify({ userIds: users }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (createChatResponse.ok) {
          const newChat = await createChatResponse.json();
          setChat(newChat);
          chatId = newChat.id;
        } else {
          console.error("Error creating chat");
          return;
        }
      }
      await getPrivateChatAndMessages();

      const newMessage = {
        content: message,
        chatId: chatId,
        sender_id: userData.id,
        type: "text",
        is_anonymous: false,
        messageReceivers: receiverId ? [receiverId] : [],
      };

      const sendDate = timeAgo(new Date().toISOString());

      const messagesData = {
        username: userData.username,
        sender_id: userData.id,
        user_type: userData.user_type,
        profile_image: userData.profile_image,
        content: message,
        send_date: sendDate,
        type: "text",
        is_anonymous: false,
        chat_id: chatId,
      };
      setMessages((prevMessages) => [...prevMessages, messagesData]);

      sendMessage(newMessage);

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSnappear = () => {
    if (userList.length > 0) {
      const newRandomUser =
        userList[Math.floor(Math.random() * userList.length)];
      setRandomUser(newRandomUser);

      if (sentRequests.has(newRandomUser.id)) {
        setIsRequestSent(true);
      } else {
        setIsRequestSent(false);
      }
    }
  };

  const handleSendRequest = async () => {
    if (!randomUser || !userId) return;

    try {
      const endpoint = isRequestSent
        ? `${API_URL}/follow/${userId}/${randomUser.id}`
        : `${API_URL}/follow/${userId}/${randomUser.id}`;

      const response = await fetch(endpoint, {
        method: isRequestSent ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setIsRequestSent(!isRequestSent);
        setSentRequests((prev) => {
          const updatedRequests = new Set(prev);
          if (isRequestSent) {
            updatedRequests.delete(randomUser.id);
          } else {
            updatedRequests.add(randomUser.id);
          }
          return updatedRequests;
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error al conectarse al servidor:", error);
      alert("No se pudo procesar la acción.");
    }
  };

  return (
    <div>
      <NavBar />
      <Sidebar />

      <div className="flex items-center justify-center mt-10 mb-5 ">
        <div className="bg-white rounded-lg shadow-md w-1/2 max-w-lg relative">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center">
              <div className="relative w-12 h-12">
                <Image
                  src="/agregarfoto.png"
                  alt="Foto de perfil"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="ml-3">
                {loading ? (
                  <p className="text-gray-500">Cargando usuario...</p>
                ) : randomUser ? (
                  <>
                    <h1 className="text-lg font-semibold flex items-center">
                      <Link
                        href={`/perfil/${randomUser.username}`}
                        className="text-black hover:underline"
                      >
                        @{randomUser.username}
                      </Link>
                    </h1>
                    <p className="text-sm text-gray-500">
                      {randomUser.fullname}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500">No hay usuarios disponibles</p>
                )}
              </div>
            </div>
            <button
              onClick={handleSendRequest}
              className={`${
                isRequestSent ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              } text-white px-4 py-2 rounded-lg text-sm transition`}
            >
              {isRequestSent ? "Dejar de seguir" : "Seguir"}
            </button>
          </div>
          <div className="flex-1 px-4 py-6 overflow-y-auto min-h-[60vh]">
            {randomUser ? (
              <>
                {chat ? (
                  messages.length > 0 ? (
                    messages.map((uniqueMsg, index) => {
                      const isSender = uniqueMsg.sender_id === userData?.id;

                      const divContainer = isSender ? (
                        <div
                          className="text-right"
                          key={`${uniqueMsg.sender_id}-${index}`}
                        >
                          <div className="p-2 bg-blue-100 rounded-lg my-2">
                            <p>{uniqueMsg.username}</p>
                            <p>{uniqueMsg.content}</p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="text-left"
                          key={`${uniqueMsg.sender_id}-${index}`}
                        >
                          <div className="p-2 bg-blue-100 rounded-lg my-2">
                            <p>{uniqueMsg.username}</p>
                            <p>{uniqueMsg.content}</p>
                          </div>
                        </div>
                      );

                      return divContainer;
                    })
                  ) : (
                    <p className="text-center text-gray-400">
                      Inicia tu conversación con @{randomUser.username}
                    </p>
                  )
                ) : (
                  <p className="text-center text-gray-400">
                    Esperando selección...
                  </p>
                )}
              </>
            ) : (
              <p className="text-center text-gray-400">
                No hay usuarios disponibles
              </p>
            )}
          </div>
          <div className="px-4 py-3 border-t flex items-center">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex items-center ml-3 space-x-3">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition"
                onClick={() => {
                  if (randomUser?.id) {
                    handleSendMessage(randomUser.id);
                  } else {
                    console.error("Random user ID is not available");
                  }
                }}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <button
          onClick={handleSnappear}
          className="relative w-16 h-16 cursor-pointer"
          aria-label="Buscar nuevo usuario"
          title="Snappear"
        >
          <Image
            src="/snappear.png"
            alt="Snappear"
            layout="fill"
            className="object-contain"
          />
        </button>
      </div>

      <div className="hidden md:flex flex-col w-80 space-y-6 absolute right-20 top-1/2 transform -translate-y-1/2">
        <Conectados />
      </div>
    </div>
  );
};

export default ChatView;
