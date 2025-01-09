"use client";

import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";

const DashboardPicture = () => {
  const { userData } = useContext(UserContext);

  return (
    <nav className="bg-black flex justify-between items-center px-4 w-full h-[80px] fixed top-0 left-0 mb-10">
      <div className="flex items-center ml-auto">
        <p className="text-white font-semibold text-l mr-3">{userData?.username}</p>
        <Link href={`/perfil/${userData?.username}`}>
          <Image
            src={userData?.profile_image || "/default-profile.png"}
            alt={userData?.username || "Profile Picture"}
            width={40}
            height={40}
            className="rounded-full border-2"
          />
        </Link>
      </div>
    </nav>
  );
};

export default DashboardPicture;
