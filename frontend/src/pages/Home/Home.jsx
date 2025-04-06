import { useEffect } from "react";
import NoteCard from "../../components/NoteCard";
import { FaPlus } from "react-icons/fa";

const Home = () => {

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
                    tags="tag1"
                    isPinned={true}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    onPinNote={() => {}}
                />
                <NoteCard 
                    title="Note 1"
                    date="2023-01-01"
                    content="This is a note"
                    tags="tag1"
                    isPinned={true}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    onPinNote={() => {}}
                />
                <NoteCard 
                    title="Note 1"
                    date="2023-01-01"
                    content="This is a note"
                    tags="tag1"
                    isPinned={true}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    onPinNote={() => {}}
                />
                <NoteCard 
                    title="Note 1"
                    date="2023-01-01"
                    content="This is a note"
                    tags="tag1"
                    isPinned={true}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    onPinNote={() => {}}
                />
                <NoteCard 
                    title="Note 1"
                    date="2023-01-01"
                    content="This is a note"
                    tags="tag1"
                    isPinned={true}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    onPinNote={() => {}}
                />
                <NoteCard 
                    title="Note 1"
                    date="2023-01-01"
                    content="This is a note"
                    tags="tag1"
                    isPinned={true}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    onPinNote={() => {}}
                />
            </div>
        </div>

        <button 
            className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all ease-in-out"
            onClick={() => console.log('Add new note')}
        >
            <FaPlus className="text-xl" />
        </button>
        </>
    )
}   

export default Home;