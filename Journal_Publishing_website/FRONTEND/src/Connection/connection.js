import axios from "axios";
import { faker } from '@faker-js/faker';
const allJournalDataById = async(id)=>{
    const {data} = await axios.get(`http://localhost:8080/journal/${id}`);
    console.log(data)
    return data
}

const newJournalAdd = async (id,title,image)=>{
    const {data} = await axios.post(`http://localhost:8080/journal/${id}/addjournal`,{title:title,image:image})
    return data;
}

const deleteAJournal = async (id,journalId)=>{
    const {data} = await axios.delete(`http://localhost:8080/journal/${id}/${journalId}/deletejournal`);
    return data;
}

const fetchNotesforAJournal = async (id,journalId)=>{
    const {data} = await axios.get(`http://localhost:8080/journal/${id}/${journalId}`)
    return data;
}

const addNewNote = async (id,journalId)=>{
    let {data} = await axios.post(`http://localhost:8080/journal/${id}/${journalId}/addnote`,{title:faker.company.catchPhrase(),content:"Content",create_at:Date()})
    console.log(data)
    return data
}

const getSingleNote = async (id,journalId,noteId) =>{
    let {data} = await axios.get(`http://localhost:8080/journal/${id}/${journalId}/${noteId}`)
    return data;
}

const updateANote = async (id,journalId,noteId,title,content)=>{
    let data = await axios.put(`http://localhost:8080/journal/${id}/${journalId}/${noteId}`,{title:title,content:content});
    return data;
}
const deleteANote = async (id,journalId,noteId)=>{
    let data = await axios.delete(`http://localhost:8080/journal/${id}/${journalId}/${noteId}`)
    return data;
}
export {allJournalDataById,newJournalAdd,deleteAJournal,fetchNotesforAJournal,deleteANote,addNewNote,getSingleNote,updateANote}