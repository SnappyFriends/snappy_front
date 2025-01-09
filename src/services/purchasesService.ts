import { IPurchase } from "@/interfaces/types";

export const fetchPurchases = async (): Promise<IPurchase[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchases`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching purchases:", error);
    throw error;
  }
};
