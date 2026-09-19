const { z } = require("zod");

const { nameField, emailField } = require("./common.fields");

const patientFields = {
  id: z.string(),
  name: nameField,
  email: emailField,
  phone: z
    .string({ required_error: "El teléfono es obligatorio" })
    .trim()
    .regex(/^\+?[\d\s-]{7,20}$/, "El teléfono no es válido")
    .refine(
      (value) => value.replace(/\D/g, "").length >= 7,
      "El teléfono debe tener al menos 7 dígitos"
    ),
  document: z
    .string({ required_error: "El documento es obligatorio" })
    .trim()
    .regex(/^\d{6,15}$/, "El documento debe tener entre 6 y 15 números"),
};

const patientModel = z.object({
  id: patientFields.id,
  name: patientFields.name,
  email: patientFields.email,
  phone: patientFields.phone,
  document: patientFields.document,
});

const createPatientSchema = z.object({
  name: patientFields.name,
  email: patientFields.email,
  phone: patientFields.phone,
  document: patientFields.document,
});

const updatePatientSchema = createPatientSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "Debes enviar al menos un campo para actualizar",
  }
);

module.exports = {
  patientModel,
  createPatientSchema,
  updatePatientSchema,
};
