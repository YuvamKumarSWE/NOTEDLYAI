const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const authCreateRoute = require("./routes/authCreate");
const authLoginRoute = require("./routes/authLogin");
const addNoteRoute = require("./routes/addNote");
const editNoteRoute = require("./routes/editNote");
const getAllNotesRoute = require("./routes/getAllNotes");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get('/', (req, res) => {                              // Test Api endpoint
    res.status(200).json({ message: 'while(!(succeed = try()));' });
});

app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })

app.use(authCreateRoute);
app.use(authLoginRoute);
app.use(addNoteRoute);
app.use(editNoteRoute);
app.use(getAllNotesRoute);


module.exports = app;