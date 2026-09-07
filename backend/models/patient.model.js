const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/patients.json");

const getPatients = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const savePatients = (patients) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(patients, null, 2)
  );
};

module.exports = {
  getPatients,
  savePatients,
};