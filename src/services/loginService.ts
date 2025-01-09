import { IFormDataLogin, ILoginResponse } from "@/interfaces/types";

export const loginUser = async (
  data: IFormDataLogin
): Promise<ILoginResponse> => {
  try {
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
      throw new Error(error.message || "Error en try loginService.ts");
    }

    const dataResponse: ILoginResponse = await response.json();

    if (dataResponse.user_status === "banned") {
      throw new Error("Lo sentimos, pero has sido baneado por incumplir las normas.");
    }

    return dataResponse;
  } catch (error) {
    throw new Error(
      (error as Error).message || "Error desconocido en el servicio."
    );
  }
};
