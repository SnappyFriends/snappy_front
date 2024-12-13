export interface IFormDataLogin {
  email: string;
  password: string;
}

export interface IFormDataRegister {
  nombreCompleto: string;
  fechaDeNacimiento: string;
  genero: "hombre" | "mujer" | "otro" | string;
  correoElectronico: string;
  contrasena: string;
}

export interface IValidateAge {
  (value: string): boolean | string;
}