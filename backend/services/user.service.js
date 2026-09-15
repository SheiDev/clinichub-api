const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config");

const {
  getUsers,
  saveUsers,
  findUserByEmail,
} = require("../models/user.model");

const registerUser = (userData) => {
  if (!userData?.name || !userData?.email || !userData?.password) {
    return {
      error: "Nombre, correo y contraseña son obligatorios",
    };
  }

  const users = getUsers();

  const userExists = users.find(
    (user) =>
      user.email.toLowerCase() === userData.email.toLowerCase()
  );

  if (userExists) {
    return {
      error: "El correo ya está registrado",
    };
  }

  const hashedPassword = bcrypt.hashSync(
    userData.password,
    10
  );

  const newUser = {
    id: Date.now().toString(),
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
  };

  users.push(newUser);
  saveUsers(users);

  const { password, ...userWithoutPassword } = newUser;

  return {
    message: "Usuario registrado correctamente",
    user: userWithoutPassword,
  };
};

const loginUser = (userData) => {
  if (!userData?.email || !userData?.password) {
    return {
      error: "Correo y contraseña son obligatorios",
    };
  }

  const user = findUserByEmail(userData.email);

  if (!user) {
    return {
      error: "Correo o contraseña incorrectos",
    };
  }

  const passwordCorrect = bcrypt.compareSync(
    userData.password,
    user.password
  );

  if (!passwordCorrect) {
    return {
      error: "Correo o contraseña incorrectos",
    };
  }

  const { password, ...userWithoutPassword } = user;

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    jwtSecret,
    {
      expiresIn: "24h",
    }
  );

  return {
    message: "Login exitoso",
    user: userWithoutPassword,
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};