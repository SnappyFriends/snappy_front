import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "../context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Footer from "@/components/Footer"; 
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import Conectados from "@/components/Conectados";

const interRegular = localFont({
  src: "./fonts/Inter28pt-Regular.woff",
  variable: "--font-regular",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Snappy",
  description: "Encuentra amigos al instante",
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
              <div className="flex flex-1">
                <div className="w-64 p-4">
                  <Sidebar />
                </div>
    
                <main className="ml-32 w-full flex justify-center">{children}</main>
                
                <div className="w-96 mr-4">
                  <Conectados />
                </div>
              </div>

              <Footer /> 
            </div>
          </UserProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
