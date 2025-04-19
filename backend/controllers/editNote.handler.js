const Note = require("../models/note.model");

exports.editNote = async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, isPinned } = req.body;
    const user = req.user; 

    if(!title || !content){
        return res.status(400).json({ message: "Title and content changes are required" });
    }

    try{  
        
        const note = await Note.findOne({ _id: noteId, userID: user.id })

        if(!note){
            return res.status(404).json({ message: "Note not found" });
        }

        if(title){
            note.title = title;
        }
        if(content){
            note.content = content;
        }
        if(isPinned !== undefined){ 
            note.isPinned = isPinned;
        }

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        })
    } catch(err){
        console.error(err); 
        res.status(500).json({ error: true, message: "Something went wrong" });
    }
};