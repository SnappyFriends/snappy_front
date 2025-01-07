"use client";

import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";

const DashboardPicture = () => {
  const { userData } = useContext(UserContext);

  return (
    <nav className="bg-gray-50 flex justify-between items-center h-40 px-4 w-[80%] ml-[20%] fixed top-0 left-0">
      <h1 className=" text-black font-extrabold text-2xl justify-center "></h1>      
        <div className="flex flex-row items-center mt-2 mr-10 cursor-pointer">
            <Link href={`/perfil/${userData?.username}`}>
          <Image
            src={userData?.profile_image || "/default-profile.png"}
            alt={userData?.username || "Profile Picture"}
            width={80}
            height={80}
            className="rounded-full border-2 mr-5"
          />
           </Link>
          <p className="text-black text-center font-semibold text-xl">
            {userData?.username}
          </p>
         
         
        </div>
    </nav>
  );
};

export default DashboardPicture;
