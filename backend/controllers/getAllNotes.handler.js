const Note = require("../models/note.model");

exports.getAllNotes = async (req, res) => {

    const user = req.user;

    if(!user || !user.id){
        return res.status(401).json({error: true, message: "Unauthorized/User error"});
    
    }

    try{
        const notes = await Note.find({userID: user.id}).sort({isPinned:-1});

        return res.status(200).json({error: false, notes, message: "Notes fetched successfully"});
    
    } catch(err){
        console.error("Error fetching notes:", err);
        return res.status(500).json({error: true, message: "Internal server error"});
    }

    
};