const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const {auth} = require("./jwt");
const User = require("./models/user.model");
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
dotenv.config({ path: "./config.env" });
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello, world!' });
});

//Create Account
app.post('/create-account', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if(!fullName){
            return res.status(400).json({ message: 'Full Name is required' });
        }
        if(!email){
            return res.status(400).json({ message: 'Email is required' });
        }
        if(!password){
            return res.status(400).json({ message: 'Password is required' });
        }

        const isUser = await User.findOne({email: email});

        if(isUser){
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            fullName: fullName,
            email: email,
            password: password // Password will be hashed by the pre-save hook
        });

        await user.save();

        // Don't include password in response
        const userToReturn = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        };

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        return res.status(201).json({
            success: true, 
            user: userToReturn, 
            accessToken, 
            message: "Registration Complete"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

// Add a login route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Create token
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        
        // Return user info
        return res.json({
            success: true,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email
            },
            accessToken
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = app;