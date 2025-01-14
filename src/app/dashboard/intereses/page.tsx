"use client";

import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faPen,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "@/context/UserContext";

export interface IInterest {
  interest_id: string;
  name: string;
  active: boolean;
}

export default function InterestsDashboard() {
  const { token } = useContext(UserContext);
  const [interests, setInterests] = useState<IInterest[]>([]);
  const [editingInterest, setEditingInterest] = useState<IInterest | null>(
    null
  );
  const [newInterest, setNewInterest] = useState<string>("");
  const [addingInterest, setAddingInterest] = useState(false);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/interest/admin/interests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Error fetching interests");
        }
        const data: IInterest[] = await res.json();
        setInterests(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInterests();
  }, []);

  const handleToggleInterest = async (
    id: string,
    currentActiveStatus: boolean
  ) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/interests/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ active: !currentActiveStatus }),
        }
      );
      if (!res.ok) {
        throw new Error("Error toggling interest status");
      }

      setInterests((prev) =>
        prev.map((interest) =>
          interest.interest_id === id
            ? { ...interest, active: !currentActiveStatus }
            : interest
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (interest: IInterest) => {
    setEditingInterest(interest);
    setNewInterest(interest.name);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingInterest) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/interests/${editingInterest.interest_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: newInterest }),
          }
        );
        if (!res.ok) {
          throw new Error("Error editing interest");
        }
        setInterests((prev) =>
          prev.map((interest) =>
            interest.interest_id === editingInterest.interest_id
              ? { ...interest, name: newInterest }
              : interest
          )
        );
        setEditingInterest(null);
        setNewInterest("");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddInterest = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/interests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newInterest }),
      });
      if (!res.ok) {
        throw new Error("Error adding interest");
      }
      const newInterestData: IInterest = await res.json();
      setInterests((prev) => [...prev, newInterestData]);
      setNewInterest("");
      setAddingInterest(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pb-20 flex flex-col gap-6 w-[73rem]">
      <h1 className="text-2xl text-center font-bold mb-6">
        Gestionar Intereses
      </h1>

      <div className="mb-6 flex gap-4 justify-center">
        {!addingInterest && (
          <button
            onClick={() => setAddingInterest(true)}
            className="flex items-center text-green-600 hover:text-green-800"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Agregar Interés
          </button>
        )}

        {addingInterest && (
          <div className="flex gap-2">
            <input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="Nuevo nombre"
              className="border border-gray-300 p-2 rounded-md"
              required
            />
            <button
              onClick={handleAddInterest}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Guardar
            </button>
            <button
              onClick={() => setAddingInterest(false)}
              className="text-gray-600 hover:text-gray-800 px-4 py-2"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      <table className="table-auto border-collapse border border-gray-300 mx-auto w-fit">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-4">Nombre</th>
            {/* <th className="border border-gray-300 p-4">ID</th> */}
            <th className="border border-gray-300 p-4">Editar</th>
            <th className="border border-gray-300 p-4">Activo</th>
          </tr>
        </thead>
        <tbody>
          {interests.map((interest) => (
            <tr key={interest.interest_id} className="text-center">
              <td className="border border-gray-300 p-4">{interest.name}</td>
              {/* <td className="border border-gray-300 p-4">
								{interest.interest_id}
							</td> */}
              <td className="border border-gray-300 p-4">
                <button
                  onClick={() => handleEdit(interest)}
                  className="text-blue-600 hover:text-blue-800"
                  aria-label={`Editar interés ${interest.name}`}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </td>
              <td className="border border-gray-300 p-4">
                <button
                  onClick={() =>
                    handleToggleInterest(interest.interest_id, interest.active)
                  }
                  className={`text-${
                    interest.active == true ? "green" : "red"
                  }-600 hover:text-${
                    interest.active == true ? "green" : "red"
                  }-800`}
                  aria-label={`Toggle estado de interés ${interest.name}`}
                >
                  <FontAwesomeIcon
                    icon={
                      interest.active == true ? faCircleCheck : faCircleXmark
                    }
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingInterest && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4">Editar Interés</h2>
            <label className="block mb-2 text-sm font-medium">
              Nuevo Nombre
            </label>
            <input
              placeholder="Nuevo nombre"
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            <div className="mt-4 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setEditingInterest(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
