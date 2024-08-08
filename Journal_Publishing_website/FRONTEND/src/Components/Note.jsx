import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import { deleteANote, getSingleNote } from "../Connection/connection";
import { useEffect } from "react";
import { updateANote } from "../Connection/connection";
import "./Notes.css"

export default function Note(){
    let [title,setTitle] = useState("")
    let [content,setContent] = useState("");
    let [create_at,setCreate_at] = useState("");
    let [isEditable,setIsEditable] = useState(false);
    let {id,journalId,noteId} = useParams();
    console.log(title);
    console.log(content);
    console.log(create_at);
    
    useEffect(()=>{async function getData (){
        let data = await getSingleNote(id,journalId,noteId);
        console.log(data)
        setTitle(()=>{
            return data.title
        })
        setContent(()=>{
            return data.content
        })
        setCreate_at(()=>{
            return data.create_at
        })      
    } getData()},[]) 
    const setEdit = (event)=>{
        event.preventDefault()
        setIsEditable(true)
    }
    const setNewTitle = (event)=>{
        setTitle(event.target.value)
        return
    }
    const setNewContent = (event)=>{
        setContent(event.target.value)
        return
    }
    const deleteNote = async (event)=>{
        let respone = await deleteANote(id,journalId,noteId) ;
        if(respone){console.log("Succefully deleted the note")}
        else{
            console.log("error occured")
        }
    }
    const handleSubmit = async(event)=>{
        event.preventDefault(); 
        try{
            console.log("working")
            const response = await updateANote(id,journalId,noteId,title,content);
            console.log(response)
            if(response.status == 200){
                console.log("Updated successfully : ",response.data);    
            }
            else{
                console.log("Didnt work");    
            }
        }  
        catch{(err)=>console.log(err)}
    }
    return(
        <div className="note">
            <form onClick={handleSubmit} >
            <div className="title bg-black text-white flex items-center text-3xl">
                <input type="text" className="ml-3 title-head bg-inherit p-2" value={title}onChange={isEditable?setNewTitle:undefined}/> 
                <span className="ml-auto mr-10 text-lg text-gray-400"  >{create_at.split(" ").slice(1,4).join("-")}</span></div>
            <textarea className="content bg-inherit text-xl " rows={8} value={content} onChange={isEditable?setNewContent:undefined} ></textarea>
            <div className="buttons  flex justify-end items-center top-2 pt-4 text-xl border-black border-t-2">
                <button className= {`mr-4 ml-5 ${isEditable&&"bg-black text-white"} `} onClick={setEdit}>Edit</button>
                <Link to={`/${id}/${journalId}`}><button className="mr-4" onClick={deleteNote}>Delete</button> </Link>
                 <Link to={`/${id}/${journalId}`}><button className="mr-4">Back</button> </Link>
                 <button type="submit" className=" px-3 py-2 border-solid border-2 border-yellow-700 rounded-lg ml-auto"  disabled={!isEditable} style={{visibility:isEditable?"visible":"hidden "}} >Save</button></div>
                 </form>
        </div>
    )
}