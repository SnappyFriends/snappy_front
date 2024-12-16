"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Conectados from "@/components/Conectados";
import Sidebar from "@/components/Sidebar";

const ActivityView = () => {
  return (
    <div>
      <Navbar />

      <div className="flex min-h-screen">
      <div className="hidden md:flex flex-col w-64 bg-white p-6 space-y-10 fixed left-6 top-1/2 transform -translate-y-1/2">
          <Sidebar />
        </div>

        <div className="flex-1 flex justify-center items-start px-4 md:ml-64 lg:mr-64 pt-20">
          <div className="w-full max-w-2xl bg-white rounded-lg p-6">
            <h1 className="text-2xl font-bold text-center mb-4">Actividad</h1>
            <div className="flex justify-center flex-wrap gap-4 mb-6">
              <button className="px-4 py-2 bg-black text-white rounded-full">Categoría 1</button>
              <button className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">Categoría 2</button>
              <button className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">Categoría 3</button>
              <button className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300">Categoría 4</button>
            </div>

            <div className="space-y-6">
              {[
                {
                  username: "starryskies23",
                  action: "Te comenzó a seguir",
                  time: "1d",
                  button: "Seguir",
                },
                {
                  username: "nebulanomad",
                  action: "Liked your post",
                  time: "1d",
                  thumbnail: "/agregarfoto.png",
                },
                {
                  username: "lunavoyager",
                  action: "Te envió una solicitud",
                  time: "3d",
                  button: "Aceptar",
                },
                {
                  username: "shadowlynx",
                  action: "Commented on your post",
                  time: "4d",
                  comment: "I’m going in September. What about you?",
                  thumbnail: "/agregarfoto.png",
                },
                {
                  username: "emberecho",
                  action: "Liked your comment",
                  time: "2d",
                  comment: "Happy birthday!!!",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10">
                      <Image
                        src="/agregarfoto.png"
                        alt={item.username}
                        layout="fill"
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <h2 className="text-sm font-semibold">{item.username}</h2>
                      <p className="text-xs text-gray-500">
                        {item.action} • {item.time}
                      </p>
                      {item.comment && (
                        <p className="text-xs text-gray-700 mt-1">{item.comment}</p>
                      )}
                    </div>
                  </div>
                  {item.button ? (
                    <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm">
                      {item.button}
                    </button>
                  ) : (
                    item.thumbnail && (
                      <div className="relative w-12 h-12">
                        <Image
                          src={item.thumbnail}
                          alt="Post thumbnail"
                          layout="fill"
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col w-80 space-y-6 absolute right-20 mt-40 ">
          <Conectados />
        </div>
      </div>
    </div>
  );
};

export default ActivityView;
