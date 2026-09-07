const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("Falta JWT_SECRET en el archivo .env");
}

module.exports = {
  port,
  jwtSecret,
};
