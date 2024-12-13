export const validateAge = (value) => {
  const today = new Date();
  const birthDate = new Date(value);
  const age = today.getFullYear() - birthDate.getFullYear();
  const isBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  return (
    (isBirthdayPassed ? age : age - 1) >= 13 || "Debes tener al menos 13 años"
  );
};