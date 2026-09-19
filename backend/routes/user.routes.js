const express = require("express");

const router = express.Router();

const { register, login } = require("../controllers/user.controller");
const validate = require("../middlewares/validate.middleware");
const {
  registerUserSchema,
  loginUserSchema,
} = require("../models/user.model");

router.post("/register", validate(registerUserSchema), register);

router.post("/login", validate(loginUserSchema), login);

module.exports = router;
