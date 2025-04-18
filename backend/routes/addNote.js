const express = require("express");
const { addNote } = require("../controllers/addNote.handler");
const router = express.Router();
const auth = require("../jwt");

router.post("/add-note", auth ,addNote);


module.exports = router;