const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.createAccount = async (req, res) => {
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

        const user = new User({ fullName, email, password });
        await user.save();

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
        return res.status(500).json({error:true, message: "Server error" });
    }
};