"use client";

import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "../context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import Conectados from "@/components/Conectados";
import { usePathname } from "next/navigation";

const interRegular = localFont({
  src: "./fonts/Inter28pt-Regular.woff",
  variable: "--font-regular",
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const shouldRenderLayout = !(
    pathname?.includes("/dashboard") ||
    pathname?.includes("/dashboard/usuarios") ||
    pathname?.includes("/dashboard/publicaciones") ||
    pathname?.includes("/dashboard/reportes") ||
    pathname?.includes("/dashboard/suscripciones") ||
    pathname?.includes("/dashboard/intereses") ||
    pathname?.includes("/register") ||
    pathname === "/"
  );

  return (
    <html lang="es">
      <body className={`${interRegular.variable} antialiased`}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
        >
          <UserProvider>
            <div className="flex flex-col min-h-screen">
              {shouldRenderLayout && (
                <div>
                  <NavBar />
                </div>
              )}
              <Toaster />
              <div className="flex flex-1 flex-wrap md:flex-nowrap">
                {shouldRenderLayout && (
                  <aside className="hidden md:block w-64 p-4 md:mr-32">
                    <Sidebar />
                  </aside>
                )}
                <main className="w-full flex justify-center">
                  {children}
                </main>
                {shouldRenderLayout && (
                  <aside className="hidden md:block w-96 p-4 md:mr-4">
                    <Conectados />
                  </aside>
                )}
              </div>
              {/* <Footer /> */}
            </div>
          </UserProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
