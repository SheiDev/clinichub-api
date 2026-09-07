const {
  getPatients,
  savePatients,
} = require("../models/patient.model");

const createPatient = (patientData) => {
  const patients = getPatients();

  const newPatient = {
    id: Date.now().toString(),
    name: patientData.name,
    email: patientData.email,
    phone: patientData.phone,
    document: patientData.document,
  };

  patients.push(newPatient);
  savePatients(patients);

  return newPatient;
};

const getAllPatients = () => {
  return getPatients();
};

const getPatientById = (id) => {
  const patients = getPatients();

  return patients.find((patient) => patient.id === id);
};

const updatePatientById = (id, patientData) => {
  const patients = getPatients();

  const patientIndex = patients.findIndex(
    (patient) => patient.id === id
  );

  if (patientIndex === -1) {
    return null;
  }

  patients[patientIndex] = {
    ...patients[patientIndex],
    ...patientData,
    id: patients[patientIndex].id,
  };

  savePatients(patients);

  return patients[patientIndex];
};

const deletePatientById = (id) => {
  const patients = getPatients();

  const patientIndex = patients.findIndex(
    (patient) => patient.id === id
  );

  if (patientIndex === -1) {
    return null;
  }

  const deletedPatient = patients[patientIndex];

  patients.splice(patientIndex, 1);

  savePatients(patients);

  return deletedPatient;
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatientById,
  deletePatientById,
};