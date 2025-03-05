import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

const SearchBar = ({value , onChange, handleSearch, onClearSearch}) => {

    

    return (
        <div className=" sm:min-w-sm min-w-4xs flex-shrink mt-4 mb-4  flex text-m border-slate-300 border-1 rounded-lg max-h-5/6 ml-2 mr-2">
            <input
                type="text"
                className="w-full placeholder-gray-400 text-gray-900 p-4"
                placeholder="Search Notes ..."
                onChange={onChange}
                value={value}
            />
            <button className=" ml-4 mr-4 text-slate-400 cursor-pointer " ><FaSearch /></button>
        </div>
    );
};

export default SearchBar;