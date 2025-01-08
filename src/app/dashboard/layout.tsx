"use client";

import React from "react";
import DashboardSidebar from "@/components/DashboardSideBar";
import DashboardPicture from "@/components/DashboardPicture";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex h-screen w-screen">
			<aside className="fixed z-50 h-full w-1/5">
				<DashboardSidebar />
			</aside>
			<header className="fixed w-full h-40 ml-[20%] bg-gray-50 hidden lg:block">
				<DashboardPicture />
			</header>
			<div className="flex ml-[20%]">
				<main className="mt-60">{children}</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
