"use client";

import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";

const DashboardPicture = () => {
	const { userData } = useContext(UserContext);

	return (
		<nav className="bg-gray-50 flex justify-between items-center px-4 w-full h-[21%] fixed top-0 left-0 mb-10">
			<h1 className=" text-black font-extrabold text-2xl justify-center "></h1>
			<div className="flex flex-row items-center mt-2 mr-10 cursor-pointer">
        <p className="text-black text-center font-semibold text-xl">
        {userData?.username}
      </p>
				<Link href={`/perfil/${userData?.username}`}>
					<Image
						src={userData?.profile_image || "/default-profile.png"}
						alt={userData?.username || "Profile Picture"}
						width={60}
						height={60}
						className="rounded-full border-2 mr-5"
					/>
				</Link>
			</div>
		</nav>
	);
};

export default DashboardPicture;
