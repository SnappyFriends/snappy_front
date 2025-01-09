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
			<header >
				<DashboardPicture />
			</header>
			<div className="flex justify-center mt-5 w-full ml-80">
				<main className="mt-20">{children}</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
