import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from './homecomponent/herosection';
import JournalsSection from './homecomponent/journalsection';
import AddJournalModal from './homecomponent/addjournal';
import EditJournalModal from './homecomponent/editjournal';
import AddAndSearchComponent from './homecomponent/addbutton';

const HomePage = () => {
  const [journalList,setJournalList] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const addJournal = (newJournal) => {
    setJournalList([...journalList, { ...newJournal, id: Date.now() }]);
    setIsAddModalOpen(false);
  };

  const deleteJournal = (id) => {
    setJournals(journals.filter(journal => journal.id !== id));
  };

  const editJournal = (id, updatedJournal) => {
    setJournals(journals.map(journal => 
      journal.id === id ? { ...journal, ...updatedJournal } : journal
    ));
    setIsEditModalOpen(false);
    setEditingJournal(null);
  };

  const handleEditClick = (journal) => {
    setEditingJournal(journal);
    setIsEditModalOpen(true);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setIsSearching(true);
  };

  const handleSearchClose = () => {
    setIsSearching(false);
    setSearchTerm('');
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For example:
    // localStorage.removeItem('token');
    navigate('/');
  };

  const filteredJournals = journals.filter(journal => 
    journal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (isSearching && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearching]);

  return (
    <div className={`min-h-screen bg-white text-black relative ${isSearching ? 'overflow-hidden' : ''}`}>
      <HeroSection />
      <div className={`container mx-auto px-4 py-8 ${isSearching ? 'filter blur-sm' : ''}`}>
        <JournalsSection 
          journals={isSearching ? filteredJournals : journals} 
          onDeleteJournal={deleteJournal}
          onEditJournal={handleEditClick}
        />
      </div>
      {isSearching && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-start justify-center pt-20">
          <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-4xl">
            <div className="flex items-center mb-4">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search journals..."
                className="flex-grow p-2 border border-gray-300 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={handleSearchClose}
                className="ml-4 px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto hide-scrollbar">
              <JournalsSection 
                journals={filteredJournals} 
                onDeleteJournal={deleteJournal}
                onEditJournal={handleEditClick}
              />
            </div>
          </div>
        </div>
      )}
      <AddAndSearchComponent 
        onAdd={() => setIsAddModalOpen(true)} 
        onSearch={handleSearch}
        onLogout={handleLogout}
      />
      {isAddModalOpen && (
        <AddJournalModal onClose={() => setIsAddModalOpen(false)} onAdd={addJournal} />
      )}
      {isEditModalOpen && editingJournal && (
        <EditJournalModal 
          journal={editingJournal}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingJournal(null);
          }} 
          onEdit={editJournal}
        />
      )}
    </div>
  );
};

export default HomePage;
