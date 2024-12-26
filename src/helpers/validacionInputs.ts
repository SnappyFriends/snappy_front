export const validacionInputs = {
  fullname: {
    required: "El nombre completo es obligatorio",
    pattern: {
      value: /^(?=.*\b\w{2,}\b.*\b\w{2,}\b).*$/,
      message:
        "Debe contener al menos dos palabras separadas por un espacio y cada palabra debe tener al menos dos caracteres",
    },
  },
  birthdate: {
    required: "La fecha de nacimiento es obligatoria",
    validate: {
      validAge: (value: string) => {
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const isBirthdayPassed =
          today.getMonth() > birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() &&
            today.getDate() >= birthDate.getDate());

        return (
          (isBirthdayPassed ? age : age - 1) >= 13 ||
          "Debes tener al menos 13 años"
        );
      },
    },
  },
  genre: {
    required: "El género es obligatorio",
  },
  email: {
    required: "El correo electrónico es obligatorio",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Por favor, ingresa un correo electrónico válido",
    },
  },
  username: {
    required: "El nombre de usuario es obligatorio",
    minLength: {
      value: 3,
      message: "El nombre de usuario debe tener al menos 3 caracteres",
    },
    maxLength: {
      value: 20,
      message: "El nombre de usuario no puede tener más de 20 caracteres",
    },
    pattern: {
      value: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{2,19}$/,
      message:
        "El nombre de usuario solo puede contener letras, números, puntos y guiones bajos, no puede tener dos puntos seguidos ni terminar con un punto",
    },
    setValueAs: (value: string) => value.toLowerCase(),
  },
  password: {
    required: "La contraseña es obligatoria",
    pattern: {
      value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
      message:
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
    },
  },
  passwordOptional: {
    pattern: {
      value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
      message:
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial",
    },
    validate: (value: string | undefined) => {
      if (value && !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(value)) {
        return "La contraseña debe cumplir con los requisitos de seguridad";
      }
      return true;
    },
  },
  description: {
    maxLength: {
      value: 200,
      message: "La presentación no puede tener más de 200 caracteres",
    },
  },
};
