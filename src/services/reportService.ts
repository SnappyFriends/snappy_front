import { IReport } from "@/interfaces/types";

export const fetchReports = async (): Promise<IReport[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};
