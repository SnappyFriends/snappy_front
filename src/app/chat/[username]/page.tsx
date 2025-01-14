"use client";

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getUsersByUsername } from "@/helpers/users";
import { UserContext } from "@/context/UserContext";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import Conectados from "@/components/Conectados";
import { Chats, IMessage, IUsernameData } from "@/interfaces/types";
import { timeAgo } from "@/helpers/timeAgo";
import { useSocket } from "@/helpers/useSocket";
import Link from "next/link";

const ChatWithUser = () => {
  const { username } = useParams();
  const [user, setUser] = useState<IUsernameData | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { userData } = useContext(UserContext);
  const [chat, setChat] = useState<Chats | null>(null);

  const { sendMessage } = useSocket(null, chat, setMessages, undefined);

  useEffect(() => {
    (async () => {
      try {
        if (!username || Array.isArray(username)) {
          console.error("Invalid username");
          return;
        }

        const userDataResponse = await getUsersByUsername(username);
        setUser(userDataResponse);

        if (userDataResponse.id) {
          (async (receiverId: string) => {
            if (!userData) {
              return;
            }

            try {
              const responseChats = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/chats/${receiverId}/${userData?.id}`
              );

              if (responseChats.ok) {
                const chatData = await responseChats.json();

                const responseMessages = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/chats/chat/${chatData.id}`
                );
                const messagesData = await responseMessages.json();
                setChat(messagesData);
                setMessages(messagesData.messages);
              } else {
                const users = [receiverId, userData?.id];
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
                } else {
                  console.error("Error creating chat:", createChatResponse);
                }
              }
            } catch (error) {
              console.error("Error buscando o creando el chat:", error);
            }
          })(userDataResponse.id);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    })();
  }, [username, userData]);

  const handleSendMessage = async (receiverId: string) => {
    if (!message.trim()) return;
    if (!chat) {
      console.error("No chatId available");
      return;
    }

    if (!userData) {
      return;
    }

    const newMessage = {
      content: message,
      chatId: chat.id,
      sender_id: userData.id,
      type: "text",
      is_anonymous: false,
      messageReceivers: receiverId ? [receiverId] : [],
    };

    try {
      const sendDate = new Date();

      const messagesData = {
        username: userData.username,
        sender_id: userData.id,
        user_type: userData.user_type,
        profile_image: userData.profile_image,
        content: message,
        send_date: sendDate,
        type: "text",
        is_anonymous: false,
        chat_id: chat.id,
      };
      setMessages((prevMessages) => [...prevMessages, messagesData]);

      sendMessage(newMessage);

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!user) {
    return <p className="text-center">Cargando usuario...</p>;
  }

  return (
    <>
      <NavBar />
      <Sidebar />
      <div className="min-h-screen">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 md:w-full mx-auto mt-12 lg:mt-32">
            <div className="flex flex-col w-full max-w-[900px] mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center p-4 border-b bg-gray-100">
                <div className="relative w-12 h-12">
                  <Link href={`/perfil/${user.username}`}>
                    <Image
                      src={user.profile_image || "/agregarfoto.png"}
                      alt={user.username}
                      layout="fill"
                      className="rounded-full object-cover"
                    />
                  </Link>
                </div>
                <div className="ml-4">
                  <Link href={`/perfil/${user.username}`}>
                    <h1 className="text-lg font-semibold text-black hover:underline">
                      {user.fullname || user.username}
                    </h1>
                  </Link>

                  <p className="text-sm text-gray-500">
                    Última conexión:
                    {timeAgo(new Date(user.last_login_date).toISOString())}
                  </p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-white rounded-lg">
                {messages.length > 0 ? (
                  messages.map((uniqueMsg, index) => {
                    const isSender = uniqueMsg.sender_id === userData?.id;

                    return (
                      <div
                        key={`${uniqueMsg.sender_id}-${index}`}
                        className={`flex mb-4 ${
                          isSender ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs p-3 rounded-lg shadow-md ${
                            isSender
                              ? "bg-blue-100 text-right"
                              : "bg-gray-200 text-left"
                          }`}
                        >
                          <p className="text-sm font-bold mb-1">
                            {isSender
                              ? "Tú"
                              : uniqueMsg.username || "Desconocido"}
                          </p>

                          <p className="text-base mb-1">{uniqueMsg.content}</p>

                          <p className="text-xs text-gray-500">
                            {timeAgo(
                              new Date(uniqueMsg.send_date).toISOString()
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400 text-center">
                    Aún no hay mensajes...
                  </p>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t bg-gray-100 flex items-center space-x-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleSendMessage(user.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex flex-col w-80 space-y-6 absolute right-20 top-1/2 transform -translate-y-1/2">
        <Conectados />
      </div>
    </>
  );
};

export default ChatWithUser;
