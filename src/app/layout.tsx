import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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
        <Toaster />
        {children}
      </body>
    </html>
  );
}
