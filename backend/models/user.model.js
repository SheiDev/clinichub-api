const { z } = require("zod");

const { nameField, emailField } = require("./common.fields");

const userFields = {
  id: z.string(),
  name: nameField,
  email: emailField,
  password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
};

const userModel = z.object({
  id: userFields.id,
  name: userFields.name,
  email: userFields.email,
  password: userFields.password,
});

const registerUserSchema = z.object({
  name: userFields.name,
  email: userFields.email,
  password: userFields.password,
});

const loginUserSchema = z.object({
  email: userFields.email,
  password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(1, "La contraseña es obligatoria"),
});

module.exports = {
  userModel,
  registerUserSchema,
  loginUserSchema,
};
