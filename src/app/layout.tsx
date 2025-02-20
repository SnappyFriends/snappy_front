import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "../context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import Conectados from "@/components/Conectados";
import { Metadata } from "next";

const interRegular = localFont({
	src: "./fonts/Inter28pt-Regular.woff",
	variable: "--font-regular",
	weight: "400",
});

export const metadata: Metadata = {
	title: "SnappyFriends",
	description: "Descripción bla bla bla",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es">
			<body className={`${interRegular.variable} antialiased`}>
				<GoogleOAuthProvider
					clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
				>
					<UserProvider>
						<div className="flex flex-col min-h-screen">
							<NavBar />
							<Toaster />
							<div className="flex flex-1 flex-wrap md:flex-nowrap">
								<Sidebar />
								<main className="w-full flex justify-center">{children}</main>

								<Conectados />
							</div>
						</div>
					</UserProvider>
				</GoogleOAuthProvider>
			</body>
		</html>
	);
}
