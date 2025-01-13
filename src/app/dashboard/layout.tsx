"use client";

import React from "react";
import DashboardSidebar from "@/components/DashboardSideBar";
import DashboardPicture from "@/components/DashboardPicture";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex h-screen">
			<aside className="fixed h-full z-40">
				<DashboardSidebar />
			</aside>
			<header className="z-30">
				<DashboardPicture />
			</header>
			<div className="flex justify-center mt-5 w-full lg:ml-80">
				<main className="mt-20 container mx-auto px-4">{children}</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
