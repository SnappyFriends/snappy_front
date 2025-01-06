"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { io, Socket } from "socket.io-client";
import { UserContext } from "@/context/UserContext";
import Cookies from "js-cookie";
import { fetchFriends } from "@/helpers/users";
import { User as BaseUser } from "@/helpers/users";
import Link from "next/link";

interface User extends BaseUser {
  isOnline: boolean;
  id: string;
  username: string;
  profile_image: string;
  friends: [];
}

const Conectados: React.FC = () => {
  const { userId } = useContext(UserContext);
  const [friends, setFriends] = useState<User[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const authToken = Cookies.get("auth_token");
    if (!authToken) {
      console.error("No se encontró el token de autenticación en las cookies.");
      return;
    }

    const socket: Socket = io(
      `${process.env.NEXT_PUBLIC_API_URL}/chat?token=${authToken}`,
      {
        auth: { token: authToken },
        withCredentials: true,
        transports: ["websocket"],
      }
    );

    const fetchUserFriends = async () => {
      try {
        const fetchedFriends = await fetchFriends(userId);
        setFriends(
          fetchedFriends.map((friend) => ({
            ...friend,
            isOnline: onlineUsers.includes(friend.id.toString()),
          }))
        );
      } catch (error) {
        console.error("Error al obtener la lista de amigos:", error);
      }
    };

    fetchUserFriends();

    socket.on("onlineUsers", (onlineUsersList) => {
      setOnlineUsers(onlineUsersList.map((user: any) => user.id));
    });

    socket.emit("getOnlineUsers");

    return () => {
      socket.off("onlineUsers");
      socket.disconnect();
    };
  }, [userId]);

  const friendsWithOnlineStatus = friends.map((friend) => ({
    ...friend,
    isOnline: onlineUsers.includes(friend.id),
  }));

  const sortedFriends = [...friendsWithOnlineStatus].sort((a, b) => {
    if (a.isOnline === b.isOnline) return 0;
    return a.isOnline ? -1 : 1;
  });

  return (
    <div className="space-y-4 rounded-lg ml-24 mt-40">
      {sortedFriends.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No hay amigos disponibles en este momento.
        </p>
      ) : (
        <div className="overflow-y-auto max-h-96 sm:max-h-[70vh] h-[300px] sm:h-auto">
          {sortedFriends.map((friend) => (
            <Link key={friend.id} href={`/chat/${friend.username}`}>
              <div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-12 h-12">
                      <Image
                        src={friend.profile_image}
                        alt={friend.username}
                        layout="fill"
                        className="rounded-full object-cover"
                      />
                    </div>
                    <h3 className="text-sm font-semibold">{friend.username}</h3>
                  </div>
                  <div>
                    <span
                      className={`w-3 h-3 rounded-full block ${
                        friend.isOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Conectados;
