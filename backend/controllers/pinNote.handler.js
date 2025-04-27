const Note = require("../models/note.model");

exports.pinNote = async(req , res) => {
    const noteId = req.params.noteId;
    const {isPinned} = req.body;
    const user = req.user;

    
    try {

        const note = await Note.findOne({_id: noteId, userID: user.id});

        if(!note){
            res.status(500).json({error: true, message: "Note not found! Boi which shouldn't happen LOL"});
        }

        if(note.isPinned === true){
            note.isPinned = false;
        } else{
            note.isPinned = true;
        }

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note pin status successfully changed!"
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: true, message: "Internal server error"});
    }
    
};