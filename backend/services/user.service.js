const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config");

const {
  getUsers,
  saveUsers,
  findUserByEmail,
} = require("../repositories/user.repository");

const registerUser = (userData) => {
  const users = getUsers();

  const userExists = findUserByEmail(userData.email);

  if (userExists) {
    return {
      error: "El correo ya está registrado",
    };
  }

  const hashedPassword = bcrypt.hashSync(userData.password, 10);

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
