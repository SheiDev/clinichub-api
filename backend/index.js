require("./config");

const express = require("express");

const { port } = require("./config");
const indexRoutes = require("./routes/index.routes");
const userRoutes = require("./routes/user.routes");
const patientRoutes = require("./routes/patient.routes");
const authMiddleware = require("./middlewares/auth.middleware");

const app = express();

app.use(express.json());

app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/patients", patientRoutes);

app.get("/private", authMiddleware, (req, res) => {
  res.json({
    message: "Entraste a una ruta protegida",
    user: req.user,
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "Error interno del servidor",
  });
});

const server = app.listen(port, () => {
  console.log(`ClinicHub API ejecutándose en http://localhost:${port}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `El puerto ${port} ya está en uso. Cierra el otro proceso (por ejemplo un "Run Code" de VS Code) e inténtalo de nuevo.`
    );
  } else {
    console.error(err);
  }
  process.exit(1);
});
