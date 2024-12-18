export interface IFormDataLogin {
  email: string;
  password: string;
}

export interface IFormDataRegister {
  fullname: string;
  birthdate: string;
  genre: "hombre" | "mujer" | "otro" | string;
  email: string;
  username: string;
  password: string;
}

export interface IValidateAge {
  (value: string): boolean | string;
}

export interface ILoginResponse {
  token: string;
  userId: string;
  message: string;
}

export interface IUserContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  userId: string | null;
  setUserId: (id: string | null) => void;
}

export interface IUserData {
  fullname: string;
  username: string;
  email: string;
  password: string;
  birthdate: string;
  genre: string;
}
