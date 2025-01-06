"use client";

import { useState, useEffect } from "react";
import { getUsers } from "@/helpers/users";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Conectados from "@/components/Conectados";
import NavBar from "@/components/NavBar";
import CreateChat from "../crearchatgrupal/page";
// import { useSocket } from "@/helpers/useSocket";

interface User {
  id: string;
  username?: string;
  fullName?: string;
  imgSrc?: string;
  email?: string;
  profile_image: string;
}

const ChatRoomView = () => {
  const [members, setMembers] = useState<User[]>([]);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAdding, setIsAdding] = useState(false);
  const [hasGroupChats, setHasGroupChats] = useState<boolean>(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupId, setGroupId] = useState();

  // const {socket} = useSocket()

  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      console.log(users);
      setUsersList(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    // socket.on('receiveGroupMessage', (message) => {
    //   console.log('Mensaje de grupo recibido:', message);
    // });
  }, []);

  const filterUsers = (query: string) => {
    if (!query) {
      setFilteredUsers(usersList);
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const filtered = usersList.filter(
      (user) =>
        (user.username &&
          user.username.toLowerCase().includes(lowercasedQuery)) ||
        (user.fullName && user.fullName.toLowerCase().includes(lowercasedQuery))
    );
    setFilteredUsers(filtered);
  };

  useEffect(() => {
    filterUsers(searchQuery);
  }, [searchQuery, usersList]);

  useEffect(() => {
    const fetchGroupChats = async () => {
      try {
        const chatsQuantity = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/chat-groups`
        );
        const response = await chatsQuantity.json();
        console.log("data", response);
        if (Array.isArray(response) && response.length > 0) {
          const group = response[0];
          setHasGroupChats(true);
          setGroupDescription(group.description);
          setGroupName(group.name);
          setGroupId(group.group_id);
          console.log(groupId);
        } else {
          setHasGroupChats(false);
        }
      } catch {
        setHasGroupChats(false);
      }
    };
    fetchGroupChats();
  }, [groupId]);

  useEffect(() => {
    if (!groupId) return;

    const fetchGroupMembers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/group-members/${groupId}`
        );

        if (!response.ok) {
          console.error("Ocurrió un error al traer los miembros del grupo.");
          return;
        }

        const groupMembers = await response.json();

        const membersData = groupMembers
          .map((member: { user_id: string }) =>
            usersList.find((user) => user.id === member.user_id)
          )
          .filter((user: User) => user !== undefined);

        setMembers(membersData as User[]);
      } catch (error) {
        console.error("Error fetching group members:", error);
      }
    };

    fetchGroupMembers();
  }, [groupId, usersList]);

  const addMemberToRoom = async (user: User) => {
    if (!members.some((m) => m.id === user.id)) {
      const responseObject = { user_id: user.id, group_id: groupId };
      console.log(responseObject);
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
      setMembers([...members, user]);
      setSearchQuery("");
      setIsAdding(false);
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
                            alt={`Foto de perfil de ${member.username}`}
                            layout="fill"
                            className="rounded-full object-cover"
                          />
                        </div>
                        <span className="text-sm">{member.username}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setIsAdding(true)}
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
                        {filteredUsers.map((user, index) => (
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
                        <h1 className="text-xl font-semibold">{groupName}</h1>
                        <p className="text-sm text-gray-500">
                          {groupDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto mt-4 px-4 py-3 bg-white rounded-lg">
                    <p className="text-center text-gray-400">
                      Inicia tu conversación en el chat
                    </p>
                  </div>

                  <div className="px-4 py-3 border-t flex items-center space-x-3">
                    <input
                      type="text"
                      placeholder="Escribe un mensaje..."
                      className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition"
                      onClick={() => console.log("Mensaje enviado")}
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
