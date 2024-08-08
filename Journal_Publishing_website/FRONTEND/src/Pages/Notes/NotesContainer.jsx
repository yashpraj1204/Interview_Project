import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotesContainer.css'
import { Link } from 'react-router-dom';
import { fetchNotesforAJournal } from '../../Connection/connection';
import { addNewNote } from '../../Connection/connection';
import { useParams } from 'react-router-dom';
export default function NotesContainer(){
    let navigate = useNavigate();
    let {id,journalId} = useParams();
    let [notesList,setNotesList] = useState([]);
    console.log(notesList); 
    useEffect(()=>{
        const getNotes = async ()=>{
            let result  = await fetchNotesforAJournal(id,journalId)
            setNotesList(()=>[...result])
        }
        getNotes();
    },[])

    const addNew = async (event)=>{
      event.preventDefault(); 
      let result = await addNewNote(id,journalId);
      if(result){
        setNotesList([{title:result[0].title,content:result[0].content,create_at:result[0].create_at},...notesList])
      }
      
    }
    const backTo = (event)=>{
      event.preventDefault();
      navigate(`/${id}/`)
    }
    const SingleNote = (event)=>{
      event.preventDefault();
      event.stopPropagation();
      console.log(event.target);
      // navigate(`/${id}/${journalId}/${event.target.key}`)
    }
    return(
        <div className="notes-container" >
            <div className='back-button'>
              <button className='text-xl p-5 bg-black text-white border-solid fixed top-6 right-3 z-10' onClick={addNew} >Add</button>
                <button onClick={backTo} className='text-xl p-5 bg-black text-white border-solid fixed bottom-6 right-3 z-10'>
                    Back
                </button>
            </div>
        {notesList.map(note => (
          <Link to={`/${id}/${journalId}/${note._id}`}>
          <div key={note._id} className="note-card">
            <div className="note-header">
              <div className="note-title-date">
                <span className="note-title">{note.title}</span>
                <span className="note-date">{note.create_at}</span>
              </div>
            </div>
            <div className="note-content">
              {note.content}
            </div>
          </div>
          </Link>
        ))}
      </div>
    )
}