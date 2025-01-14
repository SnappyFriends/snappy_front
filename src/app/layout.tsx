"use client"

// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "../context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Footer from "@/components/Footer"; 
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import Conectados from "@/components/Conectados";
import { usePathname } from 'next/navigation';


const interRegular = localFont({
  src: "./fonts/Inter28pt-Regular.woff",
  variable: "--font-regular",
  weight: "400",
});

// export const metadata: Metadata = {
//   title: "Snappy",
//   description: "Encuentra amigos al instante",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname(); 
 const shouldRenderLayout = !(
  pathname?.includes("/dashboard") || pathname?.includes("/register") || pathname === "/"
);

  return (
    <html lang="es">
      <body className={`${interRegular.variable} antialiased`}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
        >
          <UserProvider>
            <div className="flex flex-col min-h-screen">
            {shouldRenderLayout && <NavBar />} 
            <Toaster />
              <div className="flex flex-1">
              <div className="flex flex-1">
                {shouldRenderLayout && (
                  <div className="w-64 p-4 mr-32">
                    <Sidebar />
                  </div>
    )}
                <main className=" w-full flex justify-center">{children}</main>
                
                
                {shouldRenderLayout && (
                  <div className="w-96 mr-4">
                    <Conectados />
                  </div>
                )}
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
