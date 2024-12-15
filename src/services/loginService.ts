import { IFormDataLogin, ILoginResponse } from "@/interfaces/types";

const setTokenInCookie = (token: string) => {
  const expireDate = new Date();
  expireDate.setHours(expireDate.getHours() + 1);
  document.cookie = `auth_token=${token}; expires=${expireDate.toUTCString()}; path=/`;
};

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

    if (dataResponse.token) {
      setTokenInCookie(dataResponse.token);
    }

    return dataResponse;
  } catch (error) {
    throw new Error(
      (error as Error).message || "Error desconocido en el servicio."
    );
  }
};
