const express = require('express');
const router = express.Router();
const auth = require("../jwt");
const { deleteNote } = require("../controllers/deleteNote.handler");

router.delete("/delete-note/:noteId", auth , deleteNote);



module.exports = router;









