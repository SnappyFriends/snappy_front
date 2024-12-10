"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCheckboxes() {
  const categories = [
    "Deportes",
    "Tecnología",
    "Arte",
    "Ciencia",
    "Viajes",
    "Música",
    "Cine",
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCheckboxChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category) 
        : [...prev, category] 
    );
  };

  const handleSaveChanges = () => {
    alert(`Categorías guardadas: ${selectedCategories.join(", ")}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Nombre de usuario</h2>

      <Link href="/ruta-del-link" className="relative mb-6">
        <Image
          src="/agregarfoto.png"
          alt="Icono"
          width={120}
          height={120}
        />
        <div className="absolute bottom-0 right-0">
          <Image
            src="/lapiz.png"
            alt="Lápiz"
            width={20}
            height={20}
          />
        </div>
      </Link>

      <textarea
        className="w-96 h-24 border border-gray-300 rounded-md p-4 mb-6"
        placeholder="Sobre mí"
      ></textarea>

      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">
          Selecciona tus categorías:
        </h2>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-3 text-gray-700"
            >
              <input
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCheckboxChange(category)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSaveChanges}
          className="w-96 bg-black text-white py-2 rounded-md text-lg font-semibold hover:bg-gray-800 transition duration-200"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}
