


const NewNote = () => {
    return (
        <div >
            <div className="flex flex-col gap-2 " >
                <label className="input-label">Subject</label>
                <input type="text" className="text-2xl text-slate-300 outline-none" placeholder="idk" />
            </div>

            <div className="flex flex-col gap-2 mt-5" >
                <label className="input-label">Content</label>
                <textarea type="text" className="text-md text-slate-900 outline-none bg-[#eae8efed] p-2 rounded-xl" placeholder="idk" rows={20} />
            </div>

            <button className="btn-primary bg-[#800ce662] text-xl mt-5 p-2 cursor-pointer hover:text-blue-400" onClick={()=>{}}>
                ADD <span className="text-md">➕</span>
            </button>
        </div>
    )
}

export default NewNote;