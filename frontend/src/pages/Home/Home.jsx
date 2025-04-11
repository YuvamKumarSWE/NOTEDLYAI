import { useEffect, useState } from "react";
import NoteCard from "../../components/NoteCard";
import NewNote from "./NewNote";
import { FaPlus } from "react-icons/fa";
import Modal from "react-modal";

const Home = () => {

    const [openModal, setOpenModel] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    useEffect(() => {   
        document.title = "Home - NotedlyAI"
    }, [])

    return (
        <>
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <NoteCard 
                    title="Note 1"
                    date="2023-01-01"
                    content="Informant: Elvina Hansen is the proud mother of two, one girl and one boy. She is also a
                        grandmother of eight, and the great grandmother of four. She is 81 years old and has been retired
                        for many years. She loves to garden and do genealogy. Informant: Elvina Hansen is the proud mother of two, one girl and one boy. She is also a
                        grandmother of eight, and the great grandmother of four. She is 81 years old and has been retired
                        for many years. She loves to garden and do genealogy.  "
                    isPinned={true}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    onPinNote={() => {}}
                />
            </div>
        </div>

        <button 
            className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all ease-in-out"
            onClick={() => {
                setOpenModel({ isShown: true, type: "add", data: null });
            }}
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
            <NewNote />

        </Modal>

    
        </>
    )
}   

export default Home;