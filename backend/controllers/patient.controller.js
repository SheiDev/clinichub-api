const {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatientById,
  deletePatientById,
} = require("../services/patient.service");

const create = (req, res, next) => {
  try {
    const patient = createPatient(req.body);

    res.status(201).json({
      message: "Paciente creado correctamente",
      patient,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const getById = (req, res, next) => {
  try {
    const patient = getPatientById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        error: "Paciente no encontrado",
      });
    }

    res.status(200).json({
      patient,
    });
  } catch (error) {
    next(error);
  }
};

const update = (req, res, next) => {
  try {
    const patient = updatePatientById(req.params.id, req.body);

    if (!patient) {
      return res.status(404).json({
        error: "Paciente no encontrado",
      });
    }

    res.status(200).json({
      message: "Paciente actualizado correctamente",
      patient,
    });
  } catch (error) {
    next(error);
  }
};

const remove = (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
