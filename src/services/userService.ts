const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error("Fallo el fetch getUserById");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};
