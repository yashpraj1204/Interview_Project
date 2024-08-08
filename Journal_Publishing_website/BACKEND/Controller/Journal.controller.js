const journalService  = require("../Services/Journal.services");
const jwt = require("jsonwebtoken");


const addNewUser = async (req,res)=>{
    try {
        let {username,password,email,contact} = req.body;
        console.log(username,password,email,contact);
        
        let result = await journalService.signUpNewUser(username,password,email,contact);
        res.status(200).json({message:"Successfully created new user",newUser:result})
    } catch (error) {
        res.status(400).send(error);
    } 
}

const checkUserName = async (req,res)=>{
    try { 
        console.log("checking username")
        let {username} = req.body;
        console.log("request :",username)
        let result = await journalService.isUserNamesaved(username);
        res.send({exists:result})     
    } catch (error) {
        res.send({error:error})
    }
}

const VerifyUser_Authorization = async (req,res)=>{
    try {
        console.log("login....")
        let {username,password} = req.body;
        console.log(username)
        console.log(password)
        console.log("username verification")
        let userdata = await journalService.verifyUserName(username)
        console.log("password verification")
        let isMatch =  await journalService.verifyPassword(password,userdata);
        console.log(isMatch)
        if(!userdata){ 
            res.send({exists:false})
        }
        else if(!isMatch){
            res.send({valid:false})
        }
        else{
            const token = jwt.sign({id:userdata._id},'secret',{expiresIn:"2h"});
            res.status(200).send({token:token,_id:userdata._id})    
        }
         
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

const  addNewJournal = async (req,res)=>{
    try {
        console.log("journal add controller")
        let {id} = req.params;
        console.log(id)
        const {title,image} = req.body;
        console.log(title,image)
        let result = await journalService.createNewJournal(title,image,id);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({error:error});
    }   
}
const fetchJournals = async (req,res)=>{
    try {
        console.log("all journals controller")
        let {id} = req.params
        console.log(id)
        let result = await journalService.getAllJournals(id);
        console.log(result);
        res.status(200).send(result);   
    } catch (error) {
        res.status(500).json({error:error});
    }
} 

const deleteJournal = async (req,res)=>{
    try{
        console.log("deleting journal ")
        let {journalId} = req.params;
        let result = await journalService.discardjournal(journalId);
        res.status(200).send(result)
    }
    catch(error){
        res.status(500).send(error)
    }
}

const addNewNote = async (req,res)=>{
    try {
    let {journalId} = req.params;
    let {title,content} = req.body;
    let result = await journalService.createNewNote(journalId,title,content);
    console.log(result)
    res.status(200).send(result);
    } catch (error) {
    res.status(500).send(error)
    }
}

const fetchNotes = async (req,res)=>{
    try {
        let {journalId} = req.params;
        console.log(journalId)
        let result = await journalService.getAllNotes(journalId);
        res.status(200).send(result);
    } catch (error) {
        res.json(500).send(error);
    }
}
const getANote = async (req,res)=>{
    try{
        let {id,journalId,noteId} = req.params;
        console.log(id)
        console.log(journalId)
        console.log(noteId) ;
        let result = await journalService.fetchSingleNote(journalId,noteId);
        res.status(200).send(result)
    }
    catch(error){
        res.send(error)
    }
}
const updateANote = async (req,res)=>{
    try {
        let {noteId} = req.params;
        let  {title,content} = req.body;
        let result = await journalService.updateNote(noteId,title,content);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}
const deleteANote = async (req,res)=>{
    try {
        let {noteId} = req.params
        let result = await journalService.deleteNote(noteId);
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = {addNewUser,checkUserName,VerifyUser_Authorization,addNewJournal,fetchJournals,deleteJournal,fetchNotes,getANote,addNewNote,updateANote,deleteANote};