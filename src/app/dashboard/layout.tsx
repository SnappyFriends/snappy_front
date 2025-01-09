"use client";

import React from "react";
import DashboardSidebar from "@/components/DashboardSideBar";
import DashboardPicture from "@/components/DashboardPicture";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex h-screen w-screen">
			<aside className="fixed z-50 h-full">
				<DashboardSidebar />
			</aside>
			<header >
				<DashboardPicture />
			</header>
			<div className="flex lg:ml-[15%] mt-5">
				<main className="mt-20">{children}</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
