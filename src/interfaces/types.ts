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
  userData: IUserData | null;
  setUserData: (data: IUserData | null) => void;
}

export interface IInterest {
  interest_id: string;
  name: string;
}

export interface IUserData {
  id: string;
  fullname: string;
  username: string;
  email: string;
  birthdate: string;
  genre: "hombre" | "mujer" | "otro" | string;
  description: string | null;
  profile_image: string;
  location: string;
  registration_date: string;
  last_login_date: string;
  user_type: "regular" | "admin" | string;
  status: "active" | "inactive" | string;
  interests: IInterest[] | undefined;
}

export interface IUserSearch {
  id: number;
  fullname: string;
  username: string;
}

export interface IUserSearchResponse {
  id: string;
  profile_image: string;
  fullname: string;
  username: string;
}
