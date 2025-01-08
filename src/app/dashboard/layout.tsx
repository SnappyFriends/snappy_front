"use client";

import React from "react";
import DashboardSidebar from "@/components/DashboardSideBar";
import DashboardPicture from "@/components/DashboardPicture";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex h-screen">
			<aside className="fixed z-50 h-full">
				<DashboardSidebar />
			</aside>
			<header className="fixed w-full h-40 ml-[20%] bg-gray-50 hidden lg:block">
				<DashboardPicture />
			</header>
			<div className="flex lg:ml-[15%]">
				<main className="mt-40">{children}</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
