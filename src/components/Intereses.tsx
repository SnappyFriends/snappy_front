"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { showCustomToast } from "./Notificacion";
import { IInterest } from "@/interfaces/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Intereses() {
  const { userData, setUserData, userId } = useContext(UserContext);
  const [interests, setInterests] = useState<IInterest[]>([]);
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const { handleSubmit } = useForm();

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await fetch(`${API_URL}/interests`);
        if (!response.ok) throw new Error("Error al cargar intereses");
        const data: IInterest[] = await response.json();
        setInterests(data);
      } catch (error) {
        console.error(error);
        showCustomToast(
          "Error",
          "No se pudieron cargar los intereses",
          "error"
        );
      }
    };

    fetchInterests();
  }, []);

  useEffect(() => {
    const fetchUserInterests = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`${API_URL}/users/${userId}`);
        if (!response.ok)
          throw new Error("Error al cargar intereses del usuario");
        const data = await response.json();
        setUserInterests(
          data.interests.map((interest: IInterest) => interest.interest_id)
        );
      } catch (error) {
        console.error(error);
        showCustomToast(
          "Error",
          "No se pudieron cargar tus intereses",
          "error"
        );
      }
    };

    fetchUserInterests();
  }, [userId]);

  const toggleInterest = (interestId: string) => {
    setUserInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    );
  };

  const onSubmit = async () => {
    if (!userId) {
      showCustomToast("Error", "No se encontró el usuario", "error");
      return;
    }

    try {
      for (const interestId of userInterests) {
        await fetch(
          `${API_URL}/users/${userId}/assign-interest/${interestId}`,
          {
            method: "POST",
          }
        );
      }

      const interestsToRemove = (userData?.interests ?? [])
        .filter((interest) => !userInterests.includes(interest.interest_id))
        .map((interest) => interest.interest_id);

      for (const interestId of interestsToRemove ?? []) {
        await fetch(
          `${API_URL}/users/${userId}/remove-interest/${interestId}`,
          {
            method: "DELETE",
          }
        );
      }

      await updateUserInterests(userId);

      showCustomToast(
        "Éxito",
        "Tus intereses han sido actualizados",
        "success"
      );
    } catch (error) {
      console.error(error);
      showCustomToast(
        "Error",
        "No se pudieron actualizar tus intereses",
        "error"
      );
    }
  };

  const updateUserInterests = async (userId: string) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`);
      const updatedUserData = await response.json();

      if (userData) {
        setUserData({
          ...userData,
          interests: updatedUserData.interests ?? [],
        });
      }
    } catch (error) {
      console.error("Error al actualizar los intereses en el contexto:", error);
    }
  };

  return (
    <div className="py-5 w-full max-w-lg p-2">
      <h2 className="text-xl text-center font-bold mb-4">Actualizar Intereses</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {interests.map((interest) => (
            <label
              key={interest.interest_id}
              className={`p-2 border rounded-md cursor-pointer ${
                userInterests.includes(interest.interest_id)
                  ? "bg-blue-200"
                  : ""
              }`}
            >
              <input
                type="checkbox"
                value={interest.interest_id}
                checked={userInterests.includes(interest.interest_id)}
                onChange={() => toggleInterest(interest.interest_id)}
                className="hidden"
              />
              {interest.name}
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
        >
          Guardar intereses
        </button>
      </form>
    </div>
  );
}
