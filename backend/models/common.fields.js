const { z } = require("zod");

const nameField = z
  .string({ required_error: "El nombre es obligatorio" })
  .trim()
  .min(2, "El nombre debe tener al menos 2 caracteres")
  .regex(
    /^[a-záéíóúñüA-ZÁÉÍÓÚÑÜ\s'-]+$/,
    "El nombre solo puede contener letras y espacios"
  );

const emailField = z
  .string({ required_error: "El correo es obligatorio" })
  .trim()
  .toLowerCase()
  .email("El correo electrónico no es válido");

module.exports = {
  nameField,
  emailField,
};
