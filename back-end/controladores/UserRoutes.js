const express = require("express");
const router = express.Router();

// Importação das rotas
const registrationRouter = require("./registro");
const loginRouter = require("./login");
const sessionCheckRouter = require("./checkSession");
const feedbackRouter = require("./feedback");

// Definindo as rotas para cada funcionalidade
router.use("/registro", registrationRouter);
router.use("/login", loginRouter);
router.use("/check-session", sessionCheckRouter);
router.use("/feedback", feedbackRouter);

module.exports = router;