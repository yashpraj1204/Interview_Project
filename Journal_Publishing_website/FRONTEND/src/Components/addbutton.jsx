import  { useState,useRef } from 'react';
import { Search, LogOut, Plus } from 'lucide-react';

const AddAndSearchComponent = ({ onAdd, onSearch, onLogout }) => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleSearchClick = () => {
    onSearch('');
  };
  return (
    <div className="fixed bottom-8 right-8 flex items-center">
      <div className="relative mr-4">
        <button
          onClick={handleSearchClick}
          onMouseEnter={() => setHoveredButton('search')}
          onMouseLeave={() => setHoveredButton(null)}
          className="bg-black text-white w-16 h-16 rounded-full shadow-lg 
                     flex items-center justify-center text-3xl font-bold
                     transition-all duration-300 ease-in-out
                     hover:scale-110 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          <Search size={28} />
        </button>
        {hoveredButton === 'search' && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-sm">
            Search
          </span>
        )}
      </div>
      <div className="relative mr-4">
        <button
          onClick={onAdd}
          onMouseEnter={() => setHoveredButton('add')}
          onMouseLeave={() => setHoveredButton(null)}
          className="bg-black text-white w-16 h-16 rounded-full shadow-lg 
                     flex items-center justify-center text-3xl font-bold
                     transition-all duration-300 ease-in-out
                     hover:scale-110 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          <Plus size={28} />
        </button>
        {hoveredButton === 'add' && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-sm">
            Add
          </span>
        )}
      </div>
      <div className="relative">
        <button
          onClick={onLogout}
          onMouseEnter={() => setHoveredButton('logout')}
          onMouseLeave={() => setHoveredButton(null)}
          className="bg-black text-white w-16 h-16 rounded-full shadow-lg 
                     flex items-center justify-center text-3xl font-bold
                     transition-all duration-300 ease-in-out
                     hover:scale-110 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          <LogOut size={28} />
        </button>
        {hoveredButton === 'logout' && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-sm">
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default AddAndSearchComponent;