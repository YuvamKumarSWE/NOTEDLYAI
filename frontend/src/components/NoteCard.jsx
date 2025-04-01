import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="max-w-md border bg-white border-slate-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-all ease-in-out">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-base font-medium text-gray-800">{title}</h2>
        <div className="flex items-center">
          <span className="text-xs text-slate-500 mr-2">{date}</span>
          <MdOutlinePushPin 
            className={`icon-btn ${isPinned ? 'text-blue-500' : 'text-slate-400'}`} 
            onClick={onPinNote} 
          />
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">
        {content?.slice(0, 60)}{content?.length > 60 ? '...' : ''}
      </p>
      
      <div className="flex justify-between items-center">
        <div className="text-xs text-slate-500">
          {tags && Array.isArray(tags) 
            ? tags.map((tag, index) => (
                <span key={index} className="inline-block bg-slate-100 rounded px-2 py-1 mr-1">
                  {tag}
                </span>
              ))
            : <span className="inline-block bg-slate-100 rounded px-2 py-1">
                {tags}
              </span>
          }
        </div>
        
        <div className="flex items-center gap-2">
          <MdCreate 
            className="text-xl text-slate-500 hover:text-green-600 cursor-pointer" 
            onClick={onEdit} 
          />
          <MdDelete 
            className="text-xl text-slate-500 hover:text-red-600 cursor-pointer" 
            onClick={onDelete} 
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;