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

  const toggleInterest = async (interestId: string) => {
    if (!userId || !userData) return;

    const isAssigned = (userData?.interests || []).some(
      (i) => i.interest_id === interestId
    );

    try {
      setLoading(true);
      if (isAssigned) {
        await removeInterest(userId, interestId);
        setUserData({
          ...userData,
          interests: userData.interests?.filter(
            (i) => i.interest_id !== interestId
          ),
        });
      } else {
        await assignInterest(userId, interestId);
        setUserData({
          ...userData,
          interests: [
            ...(userData.interests || []),
            allInterests.find((i) => i.interest_id === interestId)!,
          ],
        });
      }
    } catch (error) {
      console.error(
        `Error ${isAssigned ? "removing" : "adding"} interest:`,
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">
        Administra tus intereses
      </h1>

      <div className="max-w-4xl mx-auto bg-white rounded-lg border p-6">
        <div className="flex flex-wrap gap-4">
          {allInterests.map((interest) => {
            const isSelected = (userData?.interests || []).some(
              (i) => i.interest_id === interest.interest_id
            );

            return (
              <button
                key={interest.interest_id}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  isSelected
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                onClick={() => toggleInterest(interest.interest_id)}
                disabled={loading}
              >
                {interest.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Interests;
