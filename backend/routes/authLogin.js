const express = require("express");
const { login } = require("../controllers/authLogin.handler");
const router = express.Router();

router.post("/login", login);

module.exports = router;