const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const authCreateRoute = require("./routes/authCreate");
const authLoginRoute = require("./routes/authLogin");
const addNoteRoute = require("./routes/addNote");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello, world!' });
});

app.use(authCreateRoute);
app.use(authLoginRoute);
app.use(addNoteRoute);


module.exports = app;