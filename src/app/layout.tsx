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
	description: "Descubrí y conectá con personas afines de todo el mundo. Sin necesidad de solicitudes previas ni barreras.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es">
			<body
				className={`${interRegular.variable} antialiased flex flex-col min-h-screen`}
			>
				<GoogleOAuthProvider
					clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
				>
					<UserProvider>
						<Toaster />
						<NavBar />
						<Sidebar />
						<Conectados />
						<main className="flex-1 flex justify-center mt-24 px-2 sm:mx-4">{children}</main>
					</UserProvider>
				</GoogleOAuthProvider>
			</body>
		</html>
	);
}
