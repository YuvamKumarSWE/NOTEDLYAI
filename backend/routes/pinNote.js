const express = require("express");
const {pinNote} = require("../controllers/pinNote.handler")
const router = express.Router();
const auth = require("../jwt");

router.put("/pin-note/:noteId" , auth , pinNote);



module.exports = router;