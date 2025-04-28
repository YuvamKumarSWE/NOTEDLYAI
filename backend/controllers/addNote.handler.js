const Note = require("../models/note.model");

exports.addNote = async (req, res) => {

    const { title, content } = req.body;

    // Access the user information directly from req.user (the decoded JWT payload)
    const user = req.user; // user will be like { id: '...', iat: ..., exp: ... }

    if(!title){
        return res.status(400).json({error: true,message: "Title is required"});
    }
    if(!content){
        return res.status(400).json({error: true, message: "Content is required"});
    }

    if (!user || !user.id) {
        return res.status(401).json({ error: true, message: "Unauthorized: User ID not found in token" });
    }

    try{
        const note = new Note({
            title,
            content,
            userID: user.id 
        });

        await note.save();

        return res.status(200).json({error: false, note, message: "Note added successfully"});
    }
    catch(err){
        console.error("Error adding note:", err);
        return res.status(500).json({error: true, message: "Internal server error"});
    }

};