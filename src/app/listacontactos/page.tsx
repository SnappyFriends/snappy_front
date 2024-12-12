"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

interface Friend {
  id: number;
  username: string;
  name: string;
  isFriend: boolean;
}

const initialFriends: Friend[] = [
  { id: 1, username: 'floradelosflorales', name: 'Flora Giavedoni', isFriend: true },
  { id: 2, username: 'negradetodoslados', name: 'Agustina Teseyra Baglin', isFriend: true },
  { id: 3, username: 'andreaboracchia', name: 'Andrea Boracchia', isFriend: true },
  { id: 4, username: 'andreshca', name: 'Andrés Cañete', isFriend: true },
  { id: 5, username: 'rodrigoboracchia', name: 'Rodrigo Boracchia', isFriend: true },
  { id: 6, username: 'alejandrovera', name: 'Alejandro Vera', isFriend: true },
  { id: 7, username: 'camigonzales', name: 'Camila Gonzales', isFriend: true },
  { id: 8, username: 'julioreyes', name: 'Julio Reyes', isFriend: true },
  { id: 9, username: 'marcelasalas', name: 'Marcela Salas', isFriend: true },
  { id: 10, username: 'sebastianperez', name: 'Sebastián Pérez', isFriend: true },
];

const FriendsList: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>(initialFriends);

  const handleRemoveFriend = (id: number) => {
    setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== id));
  };

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-4 w-full max-w-md rounded-lg ">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Lista de Amigos</h2>
        </div>

        <ul className="space-y-2">
          {friends.map((friend) => (
            <li key={friend.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative w-10 h-10">
                  <Image
                    src="/fotodeperfil.png"
                    alt={friend.username}
                    className="rounded-full object-cover"
                    layout="fill"
                    priority
                  />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-sm">{friend.username}</p>
                  <p className="text-gray-500 text-xs">{friend.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  className={`px-3 py-1 rounded-md text-sm ${
                    friend.isFriend
                      ? 'bg-gray-200 text-gray-600'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {friend.isFriend ? 'Amigos' : 'Añadir'}
                </button>
                <button
                  onClick={() => handleRemoveFriend(friend.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default FriendsList;