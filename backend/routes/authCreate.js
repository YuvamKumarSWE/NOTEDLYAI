const express = require("express");
const { createAccount } = require("../controllers/authCreate.handler");
const router = express.Router();

router.post("/create-account", createAccount);

module.exports = router;