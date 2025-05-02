import { useEffect, useState } from "react";
import NoteCard from "../../components/NoteCard";
import { FaPlus } from "react-icons/fa";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from '../../components/Navbar';
import { toast } from 'react-toastify';

const Home = () => {
    const [openModal, setOpenModel] = useState({
        isShown: false,
        type: "add", 
        data: null,
    });

    const [userInfo, setUserInfo] = useState(null);
    const [notes, setNotes] = useState([]);
    const [loadingNotes, setLoadingNotes] = useState(true);
    const [notesError, setNotesError] = useState("");
    const [noteForm, setNoteForm] = useState({ title: "", content: "" });
    const [formError, setFormError] = useState("");
    const [formLoading, setFormLoading] = useState(false);
    const navigate = useNavigate();

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
    };

    const getAllNotes = async () => {
        setLoadingNotes(true);
        setNotesError("");
        try {
            const response = await axiosInstance.get("/get-all-notes/");
            if (response.data && Array.isArray(response.data.notes)) {
                setNotes(response.data.notes);
            }
        } catch (error) {
            setNotesError("Failed to load notes: " + error.message);
        } finally {
            setLoadingNotes(false);
        }
    };

    // ADD NOTE
    const handleAddNote = async () => {
        setFormError("");
        if (!noteForm.title) {
            setFormError("Title is required.");
            return;
        }
        setFormLoading(true);
        try {
            await axiosInstance.post("/add-note", {
                title: noteForm.title,
                content: "Click edit to add content to your note...", // Default placeholder content
            });
            setOpenModel({ isShown: false, type: "add", data: null });
            setNoteForm({ title: "", content: "" });
            toast.success("Note added successfully!");
            getAllNotes();
        } catch (error) {
            setFormError("Failed to add note." + error.message);
            toast.error("Failed to add note.");
        } finally {
            setFormLoading(false);
        }
    };

   

    // DELETE NOTE
    const handleDeleteNote = async (noteId) => {
        if (!window.confirm("Delete this note?")) return;
        try {
            await axiosInstance.delete(`/delete-note/${noteId}`);
            toast.success("Note deleted successfully!");
            getAllNotes();
        } catch (error) {
            alert("Failed to delete note." + error.message);
            toast.error("Failed to delete note.");
        }
    };

    // PIN NOTE
    const handlePinNote = async (noteId) => {
        try {
            await axiosInstance.put(`/pin-note/${noteId}`);
            getAllNotes();
            toast.success(noteId.isPinned ? "Note unpinned successfully!" : "Note pinned successfully!");
            
        } catch (error) {
            alert("Failed to pin note." + error.message);
        }
    };

    const openEditModal = (note) => {
        navigate(`/edit/${note._id}`);
    };

    const openAddModal = () => {
        setNoteForm({ title: "", content: "" });
        setOpenModel({ isShown: true, type: "add", data: null });
    };

    useEffect(() => {
        getUserInfo();
        getAllNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {   
        document.title = "Home - NotedlyAI"
    }, []);

    return (
        <>
        <Navbar userInfo={userInfo} />
        <div className="container mx-auto p-4">
            {loadingNotes ? (
                <div className="text-center text-gray-500">Loading notes...</div>
            ) : notesError ? (
                <div className="text-center text-red-500">{notesError}</div>
            ) : notes.length === 0 ? (
                <div className="text-center text-gray-400">No notes found.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.map(note => (
                        <NoteCard 
                            key={note._id}
                            title={note.title}
                            date={new Date(note.createdOn).toLocaleDateString()}
                            content={note.content}
                            isPinned={note.isPinned}
                            onEdit={() => openEditModal(note)}
                            onDelete={() => handleDeleteNote(note._id)}
                            onPinNote={() => {handlePinNote(note._id)}}
                        />
                    ))}
                </div>
            )}
        </div>

        <button 
            className="fixed bottom-8 right-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:opacity-90 transition-all"
            onClick={openAddModal}
        >
            <FaPlus className="text-xl" />
        </button>

        <Modal  
            isOpen={openModal.isShown}
            onRequestClose={() => setOpenModel({ isShown: false, type: "add", data: null })}   
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
            }}
            contentLabel="Add New Note"
            className="w-[90%] bg-gray-900/80 backdrop-blur-sm rounded-xl p-5 mt-20 mx-auto pt-7 pb-7 overflow-scroll border border-gray-700/50 shadow-2xl"
        >
            <div>
                <div className="flex flex-col gap-2">
                    <label className="input-label text-white">Title</label>
                    <input
                        type="text"
                        className="w-full p-3 rounded-lg bg-gray-800/60 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        placeholder="Title"
                        value={noteForm.title}
                        onChange={e => setNoteForm({ ...noteForm, title: e.target.value })}
                    />
                </div>
                {formError && <p className="text-red-400 text-sm mt-2">{formError}</p>}
                <button
                    className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:opacity-90 shadow-lg shadow-purple-500/20 transition-all disabled:opacity-70 mt-5"
                    onClick={handleAddNote}
                    disabled={formLoading}
                >
                    {formLoading ? "Adding..." : "Create Note"}
                </button>
            </div>
        </Modal>
        </>
    )
}   

export default Home;