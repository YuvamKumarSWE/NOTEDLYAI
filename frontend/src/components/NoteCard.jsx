import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';

const NoteCard = ({
  title,
  date,
  content,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border bg-[#eae8efed] border-slate-200 p-5 rounded-lg shadow-sm hover:shadow-md transition-all ease-in-out min-h-[250px] flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800 line-clamp-2">{title}</h2>
          <span className="text-xs text-slate-500 block mt-1">{date}</span>
        </div>
        <div className="ml-2">
          <MdOutlinePushPin 
            className={`icon-btn text-3xl ${isPinned ? 'text-blue-500' : 'text-slate-400'}`} 
            onClick={onPinNote} 
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-grow mb-4">
        <p className="text-sm text-gray-600 line-clamp-5">
          {content}
        </p>
      </div>
      
      {/* Footer */}
      <div>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            <button 
              className="text-slate-500 hover:text-green-600 p-1.5 rounded-full hover:bg-green-50 transition-colors"
              onClick={onEdit}
            >
              <MdCreate className="text-xl" />
            </button>
            <button 
              className="text-slate-500 hover:text-red-600 p-1.5 rounded-full hover:bg-red-50 transition-colors"
              onClick={onDelete}
            >
              <MdDelete className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default NoteCard;