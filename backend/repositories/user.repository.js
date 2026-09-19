const path = require("path");

const { readJson, writeJson } = require("../utils/jsonFile");

const usersFile = path.join(__dirname, "../data/users.json");

const getUsers = () => readJson(usersFile);

const saveUsers = (users) => writeJson(usersFile, users);

const findUserByEmail = (email) => {
  const users = getUsers();

  return users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
};

module.exports = {
  getUsers,
  saveUsers,
  findUserByEmail,
};
