import React from "react";
import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/NavBar";

const InProgress = () => {
  return (
    <div>
      <NavBar />

      <div className="flex flex-row min-h-screen relative">
        <div className="hidden md:flex flex-col w-64 bg-white p-6 space-y-10 fixed left-6 top-1/2 transform -translate-y-1/2">
          <Sidebar />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-2xl text-center font-semibold text-gray-700 max-w-md px-4">
            Con el Team de <span className="text-blue-500">SNAPPY FRIENDS</span>, estamos trabajando en esta funcionalidad para que pronto puedas disfrutarla.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default InProgress;
