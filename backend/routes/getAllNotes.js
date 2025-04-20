const express = require("express");
const router = express.Router();
const auth = require("../jwt");
const { getAllNotes } = require("../controllers/getAllNotes.handler");

router.get("/get-all-notes", auth, getAllNotes);

module.exports = router;
