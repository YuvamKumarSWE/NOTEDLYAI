const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

mongoose.connect(process.env.MONGODB_URI, {})
.then(() => {console.log("MongoDB Connected")})
.catch((err) => {console.error(err)});

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello, world!' });
});

app.listen(process.env.PORT, () => {
    console.log("Server running on port: " + process.env.PORT);
})