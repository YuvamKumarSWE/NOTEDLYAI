const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({error: true, message: 'Email and password are required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({error: true, message: 'User not found' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: true, message: 'Invalid credentials' });
        }

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        return res.json({
            error: false,
            message: 'Login successful',
            email,
            accessToken
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: true, message: "Server error" });
    }
};