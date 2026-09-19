const express = require("express");

const router = express.Router();

const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../controllers/patient.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  createPatientSchema,
  updatePatientSchema,
} = require("../models/patient.model");

router.post("/", authMiddleware, validate(createPatientSchema), create);
router.get("/", authMiddleware, getAll);
router.get("/:id", authMiddleware, getById);
router.put(
  "/:id",
  authMiddleware,
  validate(updatePatientSchema),
  update
);
router.delete("/:id", authMiddleware, remove);

module.exports = router;
