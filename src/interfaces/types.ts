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
  message: string;
}