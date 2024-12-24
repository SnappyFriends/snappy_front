import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"], // Permite cargar imágenes desde Cloudinary
  },
};

export default nextConfig;
