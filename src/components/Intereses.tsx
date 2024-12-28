import { useState, useEffect, useContext } from "react";
import {
  getAllInterests,
  assignInterest,
  removeInterest,
} from "../services/interestService";
import { UserContext } from "@/context/UserContext";
import { IInterest } from "@/interfaces/types";

const Interests = () => {
  const { userId, userData, setUserData } = useContext(UserContext);
  const [allInterests, setAllInterests] = useState<IInterest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const interests: IInterest[] = await getAllInterests();
        setAllInterests(interests);
      } catch (error) {
        console.error("Error fetching interests:", error);
      }
    };

    fetchInterests();
  }, []);

  const handleAddInterest = async (interestId: string) => {
    if (!userId || !userData) return;

    try {
      setLoading(true);
      await assignInterest(userId, interestId);
      setUserData({
        ...userData,
        interests: [
          ...(userData.interests || []),
          allInterests.find((i) => i.interest_id === interestId)!,
        ],
      });
    } catch (error) {
      console.error("Error adding interest:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveInterest = async (interestId: string) => {
    if (!userId || !userData) return;

    try {
      setLoading(true);
      await removeInterest(userId, interestId);
      setUserData({
        ...userData,
        interests: (userData.interests || []).filter(
          (i) => i.interest_id !== interestId
        ),
      });
    } catch (error) {
      console.error("Error removing interest:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Administra tus intereses
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl text-center font-semibold text-gray-700 mb-4">
            Tus intereses
          </h2>
          {userData?.interests?.length ? (
            <ul className="space-y-4">
              {userData.interests.map((interest) => (
                <li
                  key={interest.interest_id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <span className="text-gray-800">{interest.name}</span>
                  <button
                    className="text-red-600 hover:text-red-800 font-semibold"
                    onClick={() => handleRemoveInterest(interest.interest_id)}
                    disabled={loading}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No tienes intereses asignados.</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl text-center font-semibold text-gray-700 mb-4">
            Todos los intereses
          </h2>
          <ul className="space-y-4">
            {allInterests.map((interest) => (
              <li
                key={interest.interest_id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <span className="text-gray-800">{interest.name}</span>
                <button
                  className={`font-semibold ${
                    (userData?.interests || []).some(
                      (i) => i.interest_id === interest.interest_id
                    )
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-green-600 hover:text-green-800"
                  }`}
                  onClick={() => handleAddInterest(interest.interest_id)}
                  disabled={
                    loading ||
                    (userData?.interests || []).some(
                      (i) => i.interest_id === interest.interest_id
                    )
                  }
                >
                  Agregar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Interests;
