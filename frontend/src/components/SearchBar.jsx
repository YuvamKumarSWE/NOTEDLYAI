import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex items-center relative">
        <input
          type="text"
          className="w-full px-4 py-2 pr-16 text-gray-700 bg-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Notes..."
          onChange={onChange}
          value={value}
        />
        <div className="absolute right-0 flex items-center pr-3">
          {value && (
            <IoMdClose 
              className="text-gray-400 hover:text-blue-500 cursor-pointer mr-2 text-xl" 
              onClick={onClearSearch} 
            />
          )}
          <FaSearch 
            className="text-gray-400 hover:text-blue-500 cursor-pointer text-lg" 
            onClick={handleSearch} 
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;