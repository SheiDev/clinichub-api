const fs = require("fs");

const readJson = (filePath) => {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

const writeJson = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = {
  readJson,
  writeJson,
};
