const fs = require("fs");
const path = require("path");

const usersFile = path.join(__dirname, "../data/users.json");

const getUsers = () => {
  const data = fs.readFileSync(usersFile, "utf8");
  return JSON.parse(data);
};

const findUserByEmail = (email) => {
  const users = getUsers();

  return users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
};

const saveUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

const updateUserPassword = (userId, hashedPassword) => {
  const users = getUsers();
  const user = users.find((item) => item.id === userId);

  if (!user) {
    return;
  }

  user.password = hashedPassword;
  saveUsers(users);
};

module.exports = {
  getUsers,
  saveUsers,
  findUserByEmail,
  updateUserPassword,
};