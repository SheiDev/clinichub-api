const { registerUser, loginUser } = require("../services/user.service");

const register = (req, res, next) => {
  try {
    const result = registerUser(req.body);

    if (result.error) {
      const status = result.error.includes("obligatorios") ? 400 : 409;
      return res.status(status).json(result);
    }

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const login = (req, res, next) => {
  try {
    const result = loginUser(req.body);

    if (result.error) {
      const status = result.error.includes("obligatorios") ? 400 : 401;
      return res.status(status).json(result);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
