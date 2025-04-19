const express = require("express");
const { editNote } = require("../controllers/editNote.handler");
const router = express.Router();
const auth = require("../jwt");

router.post("/edit-note/:noteId", auth ,editNote);


module.exports = router;