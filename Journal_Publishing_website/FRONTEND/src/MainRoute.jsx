import { Routes, Route } from 'react-router-dom';
import Login from './Pages/LoginPage/Login';
import MainAuth from './Pages/Main/MainAuth';
import NotesContainer from './Pages/Notes/NotesContainer';
import Note from './Components/Note';
import Home from './Pages/Home/Home';

export default function MainRoute() {
  return (
    <Routes>
      <Route path='/' element={<MainAuth />} />
      <Route path='/:id' element={<Home />} />
      <Route path='/:id/:journalId' element={<NotesContainer/>}/>
      <Route path='/:id/:journalId/:noteId' element={<Note/>} />
    </Routes>
  );
}
