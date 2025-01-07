import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "../context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Footer from "@/components/Footer"; 

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
              <Toaster />
              <main className="flex-1">{children}</main>
              <Footer /> 
            </div>
          </UserProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
