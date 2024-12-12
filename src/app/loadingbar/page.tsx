"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LoadingBar() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 50);

    const timer = setTimeout(() => {
      router.push("/newchat");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-lg font-semibold mb-4">
        Buscando...
      </p>

      <div className="w-64 bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-blue-500 h-2.5 animate-pulse"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
