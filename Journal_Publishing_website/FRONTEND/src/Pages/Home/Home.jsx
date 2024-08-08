import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeroSection from '../../Components/herosection';
import AddAndSearchComponent from '../../Components/addbutton';
import EditJournalModal from '../../Components/editjournal';
import JournalsSection from '../../Components/journalsection';
import AddJournalModal from '../../Components/addjournal';
import { allJournalDataById } from '../../Connection/connection';
import './Home.css';

export default function Home() {
  const [journalList, setJournalList] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("List of all Journals ", journalList);

  const addJournal = (newJournal) => {
    setJournalList([...journalList, {...newJournal}]);
    setIsAddModalOpen(false);
  };

  const deleteJournal = (id) => {
    setJournalList(journalList.filter(journal => journal._id !== id));
  };

  const editJournal = (id, updatedJournal) => {
    setJournalList(journalList.map(journal => 
      journal._id === id ? { ...journal, ...updatedJournal } : journal
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
    navigate('/');
  };

  const filteredJournals = journalList.filter(journal => 
    journal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function fetchData() {
      if (isSearching && searchInputRef.current) {
        searchInputRef.current.focus();
      }
      let result = await allJournalDataById(id);
      console.log(result);
      setJournalList([...result]);
    }
    fetchData();
  }, [id]);

  return (
    <div className={`min-h-screen bg-white text-black relative ${isSearching ? 'overflow-hidden' : ''}`}>  
      <HeroSection />
      <div className={`mx-auto px-4 py-8 ${isSearching ? 'filter blur-sm' : ''}`}> 
        <h1>Welcome to the Home Page</h1>
        <JournalsSection 
          id={id}
          journals={isSearching ? filteredJournals : journalList} 
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
                id={id}
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
        <AddJournalModal onClose={() => setIsAddModalOpen(false)} onAdd={addJournal} id={id} />
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
}
