import { IFormDataLogin } from "@/interfaces/types";

export async function login(data: IFormDataLogin): Promise<any> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al iniciar sesión. Inténtalo de nuevo.");
  }

  return response.json();
}
