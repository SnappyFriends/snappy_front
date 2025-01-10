import { IFormDataRegister } from "@/interfaces/types";

export const registerUser = async (
  data: IFormDataRegister
): Promise<IFormDataRegister> => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error en try registerService.ts");
    }

    const dataResponse: IFormDataRegister = await response.json();

    return dataResponse;
  } catch (error) {
    throw new Error(
      (error as Error).message || "Error desconocido en el servicio."
    );
  }
};
