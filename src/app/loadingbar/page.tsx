import React from "react";

export default function LoadingBar() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      
      <p className="text-lg font-semibold mb-4">Buscando a tu persona ideal...</p>

      <div className="w-64 bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-blue-500 h-2.5 animate-pulse"
          style={{ width: "70%" }}
        ></div>
      </div>
    </div>
  );
}
