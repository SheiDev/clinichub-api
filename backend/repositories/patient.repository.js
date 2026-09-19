const path = require("path");

const { readJson, writeJson } = require("../utils/jsonFile");

const patientsFile = path.join(__dirname, "../data/patients.json");

const getPatients = () => readJson(patientsFile);

const savePatients = (patients) => writeJson(patientsFile, patients);

module.exports = {
  getPatients,
  savePatients,
};
