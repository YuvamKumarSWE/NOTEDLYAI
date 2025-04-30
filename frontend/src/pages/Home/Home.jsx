import { useEffect, useState } from "react";
import NoteCard from "../../components/NoteCard";
import NewNote from "./NewNote";
import { FaPlus } from "react-icons/fa";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from '../../components/Navbar';
import { toast } from 'react-toastify';

const Home = () => {
    const [openModal, setOpenModel] = useState({
        isShown: false,
        type: "add", // "add" or "edit"
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
        if (!noteForm.title || !noteForm.content) {
            setFormError("Title and content are required.");
            return;
        }
        setFormLoading(true);
        try {
            await axiosInstance.post("/add-note", {
                title: noteForm.title,
                content: noteForm.content,
            });
            setOpenModel({ isShown: false, type: "add", data: null });
            setNoteForm({ title: "", content: "" });
            getAllNotes();
        } catch (error) {
            setFormError("Failed to add note." + error.message);
        } finally {
            setFormLoading(false);
        }
    };

    // EDIT NOTE
    const handleEditNote = async () => {
        setFormError("");
        if (!noteForm.title || !noteForm.content) {
            setFormError("Title and content are required.");
            return;
        }
        setFormLoading(true);
        try {
            await axiosInstance.put(`/edit-note/${openModal.data._id}`, {
                title: noteForm.title,
                content: noteForm.content,
            });
            setOpenModel({ isShown: false, type: "add", data: null });
            setNoteForm({ title: "", content: "" });
            toast.success("Note updated successfully!");
            getAllNotes();
        } catch (error) {
            setFormError("Failed to edit note."+ error.message);
        } finally {
            setFormLoading(false);
        }
    };

    // DELETE NOTE
    const handleDeleteNote = async (noteId) => {
        if (!window.confirm("Delete this note?")) return;
        try {
            await axiosInstance.delete(`/delete-note/${noteId}`);
            getAllNotes();
        } catch (error) {
            alert("Failed to delete note." + error.message);
        }
    };

    // PIN NOTE
    const handlePinNote = async (noteId) => {
        try {
            await axiosInstance.put(`/pin-note/${noteId}`);
            getAllNotes();
        } catch (error) {
            alert("Failed to pin note." + error.message);
        }
    };

    // OPEN MODAL FOR EDIT
    const openEditModal = (note) => {
        setNoteForm({ title: note.title, content: note.content });
        setOpenModel({ isShown: true, type: "edit", data: note });
    };

    // OPEN MODAL FOR ADD
    const openAddModal = () => {
        setNoteForm({ title: "", content: "" });
        setOpenModel({ isShown: true, type: "add", data: null });
    };

    useEffect(() => {
        getUserInfo();
        getAllNotes();
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
            className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all ease-in-out"
            onClick={openAddModal}
        >
            <FaPlus className="text-xl" />
        </button>

        <Modal  
            isOpen={openModal.isShown}
            onRequestClose={() => setOpenModel({ isShown: false, type: "add", data: null })}   
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                },
            }}
            contentLabel=""
            className="w-[90%]  bg-[#0e0323] rounded-2xl p-5 mt-20 mx-auto pt-7 pb-7 overflow-scroll"
        >
            <div>
                <div className="flex flex-col gap-2">
                    <label className="input-label">Title</label>
                    <input
                        type="text"
                        className="text-2xl text-slate-300 outline-none"
                        placeholder="Title"
                        value={noteForm.title}
                        onChange={e => setNoteForm({ ...noteForm, title: e.target.value })}
                    />
                </div>
                <div className="flex flex-col gap-2 mt-5">
                    <label className="input-label">Content</label>
                    <textarea
                        className="text-md text-slate-900 outline-none bg-[#eae8efed] p-2 rounded-xl"
                        placeholder="Content"
                        rows={10}
                        value={noteForm.content}
                        onChange={e => setNoteForm({ ...noteForm, content: e.target.value })}
                    />
                </div>
                {formError && <p className="text-red-500 text-sm mt-2">{formError}</p>}
                <button
                    className="btn-primary bg-[#800ce662] text-xl mt-5 p-2 cursor-pointer hover:text-blue-400"
                    onClick={openModal.type === "add" ? handleAddNote : handleEditNote}
                    disabled={formLoading}
                >
                    {formLoading
                        ? (openModal.type === "add" ? "Adding..." : "Saving...")
                        : (openModal.type === "add" ? "ADD ➕" : "Save Changes")}
                </button>
            </div>
        </Modal>
        </>
    )
}   

export default Home;