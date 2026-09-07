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

router.post("/", authMiddleware, create);
router.get("/", authMiddleware, getAll);
router.get("/:id", authMiddleware, getById);
router.put("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, remove);

module.exports = router;