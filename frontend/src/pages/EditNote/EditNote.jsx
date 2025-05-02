import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from '../../components/Navbar';
import { toast } from 'react-toastify';
import TextareaAutosize from 'react-textarea-autosize';

const EditNote = () => {
    const { noteId } = useParams();
    const navigate = useNavigate();
    
    const [userInfo, setUserInfo] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ title: "", content: "" });
    const [saving, setSaving] = useState(false);

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

    const fetchNote = async () => {
        setLoading(true);
        try {
        
            const response = await axiosInstance.get("/get-all-notes/");
            if (response.data && Array.isArray(response.data.notes)) {
                const foundNote = response.data.notes.find(n => n._id === noteId);
                if (foundNote) {
                    setNote(foundNote);
                    setFormData({
                        title: foundNote.title,
                        content: foundNote.content
                    });
                } else {
                    setError("Note not found");
                    toast.error("Note not found");
                }
            }
        } catch (error) {
            setError("Failed to load note: " + error.message);
            toast.error("Failed to load note");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!formData.title || !formData.content) {
            toast.error("Title and content are required");
            return;
        }

        setSaving(true);
        try {
            await axiosInstance.put(`/edit-note/${noteId}`, {
                title: formData.title,
                content: formData.content,
            });
            toast.success("Note updated successfully!");
            navigate("/dashboard"); 
        } catch (error) {
            toast.error("Failed to update note: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        navigate("/dashboard");
    };

    useEffect(() => {
        getUserInfo();
        fetchNote();
        document.title = "Edit Note - NotedlyAI";
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteId]);

    if (loading) {
        return (
            <>
                <Navbar userInfo={userInfo} />
                <div className="container mx-auto p-4 text-center text-white">
                    Loading note...
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar userInfo={userInfo} />
                <div className="container mx-auto p-4 text-center text-red-500">
                    {error}
                    <div className="mt-4">
                        <button 
                            onClick={() => navigate("/dashboard")}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar userInfo={userInfo} />
            
            <div className="container mx-auto pl-5 pr-5 max-w-screen">
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50 p-6 pb-1">
                  
                    <div className="flex ">
                    <h1 className="text-2xl font-bold text-white mb-6">Edit Note</h1>
                    <div className="ml-auto ">

                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            disabled={saving}
                        >
                            Cancel
                        </button>
                        
                        <button
                            onClick={handleSave}
                            className="px-4 ml-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-colors"
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>

                    </div>
                       
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 text-lg mb-2">Title</label>
                        <input
                            type="text"
                            className="w-full p-3 rounded-lg bg-gray-800/60 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-300 text-lg mb-2">Content</label>
                        <TextareaAutosize
                            className="w-full p-3 rounded-lg bg-gray-800/60 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            minRows={5}
                            maxRows={30}
                            value={formData.content}
                            onChange={(e) => setFormData({...formData, content: e.target.value})}
                        />
                    </div>
                    
                    
                </div>
            </div>
        </>
    );
};

export default EditNote;