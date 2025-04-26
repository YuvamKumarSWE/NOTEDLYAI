const Note = require('../models/note.model')

exports.deleteNote = async (req, res) => {

    const noteId = req.params.noteId;
    const user = req.user; 
    
        try{  
            
            const note = await Note.findOne({ _id: noteId, userID: user.id })
    
            if(!note){
                return res.status(404).json({ message: "Note not found" });
            }
    
            await note.deleteOne();
    
            return res.json({
                error: false,
                note,
                message: "Note deleted successfully",
            })
        } catch(err){
            console.error(err); 
            res.status(500).json({ error: true, message: "Something went wrong" });
        }
  
};