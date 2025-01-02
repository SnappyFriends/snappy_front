"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getUsers } from "@/helpers/users";
import Link from "next/link";
import { io, Socket } from "socket.io-client";

import { User as BaseUser } from "@/helpers/users";

interface User extends BaseUser {
  isOnline: boolean;
}

const socket: Socket = io("http://localhost:3000");

const Conectados: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        const parsedUsers: BaseUser[] = JSON.parse(storedUsers);
        setUsers(parsedUsers.map((user) => ({ ...user, isOnline: false })));
      } else {
        try {
          const fetchedUsers: BaseUser[] = await getUsers();
          setUsers(fetchedUsers.map((user) => ({ ...user, isOnline: false })));

          localStorage.setItem("users", JSON.stringify(fetchedUsers));
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };

    fetchUsers();

    socket.on("onlineUsers", (onlineUsersList: string[]) => {
      setOnlineUsers(onlineUsersList);
    });

    socket.emit("getOnlineUsers");

    return () => {
      socket.off("onlineUsers");
    };
  }, []);

  const usersWithOnlineStatus = users.map((user) => ({
    ...user,
    isOnline: onlineUsers.includes(user.id),
  }));

  const sortedUsers = [...usersWithOnlineStatus].sort((a, b) => {
    if (a.isOnline === b.isOnline) return 0;
    return a.isOnline ? -1 : 1;
  });

  const firstSixUsers = sortedUsers.slice(0, 6);

  return (
    <div className="space-y-4 p-4 rounded-lg ml-24 mt-20">
      {firstSixUsers.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No hay usuarios disponibles en este momento.
        </p>
      ) : (
        firstSixUsers.map((user) => (
          <Link key={user.id} href={`/chat/${user.username}`}>
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12">
                  <Image
                    src={user.profile_image}
                    alt={user.username}
                    layout="fill"
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-semibold">{user.username}</h3>
              </div>
              <div>
                <span
                  className={`w-3 h-3 rounded-full block ${
                    user.isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Conectados;
