const express = require("express");
const router = express.Router();
const auth = require("../jwt");
const User = require("../models/user.model");

router.get("/get-user", auth, async (req, res) => {
    const userId = req.user.id;

    try {
        const isUser = await User.findById(userId);

        if (!isUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "User found",
            user: isUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;