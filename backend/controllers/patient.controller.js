const {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatientById,
  deletePatientById,
} = require("../services/patient.service");

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const create = (req, res) => {
  const { name, email, phone, document } = req.body;

  // Validar campos obligatorios
  if (!name || !email || !phone || !document) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios",
    });
  }

  // Validar correo
  if (!isValidEmail(email)) {
    return res.status(400).json({
      error: "El correo electrónico no es válido",
    });
  }

  const patient = createPatient(req.body);

  res.status(201).json({
    message: "Paciente creado correctamente",
    patient,
  });
};

const getAll = (req, res) => {
  const patients = getAllPatients();

  const { name } = req.query;

  const normalizeText = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filteredPatients = name
    ? patients.filter((patient) =>
        normalizeText(patient.name).includes(normalizeText(name))
      )
    : patients;

  res.status(200).json({
    totalPatients: filteredPatients.length,
    patients: filteredPatients,
  });
};

const getById = (req, res) => {
  const patient = getPatientById(req.params.id);

  if (!patient) {
    return res.status(404).json({
      error: "Paciente no encontrado",
    });
  }

  res.status(200).json({
    patient,
  });
};

const update = (req, res) => {
  const { email } = req.body;

  // Si se está actualizando el email, validarlo
  if (email && !isValidEmail(email)) {
    return res.status(400).json({
      error: "El correo electrónico no es válido",
    });
  }

  const patient = updatePatientById(
    req.params.id,
    req.body
  );

  if (!patient) {
    return res.status(404).json({
      error: "Paciente no encontrado",
    });
  }

  res.status(200).json({
    message: "Paciente actualizado correctamente",
    patient,
  });
};

const remove = (req, res) => {
  const patient = deletePatientById(req.params.id);

  if (!patient) {
    return res.status(404).json({
      error: "Paciente no encontrado",
    });
  }

  res.status(200).json({
    message: "Paciente eliminado correctamente",
    patient,
  });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};