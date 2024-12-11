export interface IFormDataLogin {
  email: string;
  password: string;
}

export interface IFormDataRegister {
  nombre: string;
  fechaDeNacimiento: string;
  genero: "hombre" | "mujer" | "otro";
  correoElectronico: string;
  contrasena: string;
}

export interface IValidateAge {
  (value: string): boolean | string;
}