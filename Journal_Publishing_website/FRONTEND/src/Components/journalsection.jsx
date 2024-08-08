import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAJournal } from '../Connection/connection';

const JournalCard = ({ id, journal, onDelete, onEdit }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleOpen = (e) => {
    e.stopPropagation();
    navigate(`/${id}/${journal._id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    let result = await deleteAJournal(id, journal._id);
    if (result) {
      onDelete(journal._id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(journal);
  };

  return (
    <div
      key={journal._id}
      className="relative h-64 w-full perspective-1000"
      onClick={handleClick}
    >
      <div className={`absolute w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        <div className="absolute w-full h-full backface-hidden bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <img
            className="w-full h-48 object-cover"
            src={journal.image || "/api/placeholder/400/300"}
            alt={journal.title}
            onError={(e) => (e.target.src = "/api/placeholder/400/300")}
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold truncate">{journal.title}</h3>
          </div>
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
          <img
            className="absolute w-full h-full object-cover filter blur-md"
            src={journal.image || "/api/placeholder/400/300"}
            alt={journal.title}
            onError={(e) => (e.target.src = "/api/placeholder/400/300")}
          />
          <div className="relative z-10 flex space-x-4">
            <button
              onClick={handleOpen}
              className="px-4 py-2 bg-white text-black rounded hover:bg-black hover:text-white transition-colors duration-300 border border-white hover:border-black"
            >
              Open
            </button>
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-white text-black rounded hover:bg-black hover:text-white transition-colors duration-300 border border-white hover:border-black"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300 border border-red-600 hover:border-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const JournalsSection = ({ id, journals, onDeleteJournal, onEditJournal }) => {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-6">Your Journals</h2>
      {journals.length === 0 ? (
        <p className="text-gray-600">You haven't created any journals yet. Click the + button to get started!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {journals.map((journal) => (
            <JournalCard
              key={journal._id}
              id={id}
              journal={journal}
              onDelete={onDeleteJournal}
              onEdit={onEditJournal}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JournalsSection;
