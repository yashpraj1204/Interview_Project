
const journalModels = require("../Model/Journal.model")
const bcrypt  =  require('bcrypt');

// signUp new user to the data base . 
async function signUpNewUser(username,password,email,contact){
    console.log("service working")
    const newUser = new journalModels.userModel({username:username,password:password,email:email,contact:contact});
    let savedUser  = await newUser.save();
    return savedUser;
}

async function isUserNamesaved(username){
    console.log("Checkign username is available or not ")
    let result = await journalModels.userModel.findOne({username:username});
    console.log(result)
    if(result){return true}
    return false
}

// sign in verification  
async function verifyUserName(username){
    let nameData = await journalModels.userModel.findOne({username:username})
    console.log("namedata",nameData);
    return nameData;
}   
async function verifyPassword(password,userdata){
    let cmp = await bcrypt.compare(password,userdata.password);
    console.log(cmp)
    return cmp;
}


// Creation of new journal 
async function createNewJournal(title,image,userId){
    console.log("Creating new journal for specific user");
    const newjournal = await journalModels.journalModel({title:title,image:image,user:userId});
    const saveJournal = await newjournal.save();
    return saveJournal;
}
// fetching of all journals with specific user Id

async function getAllJournals(userId){
    console.log("Finding all journals of specific user");
    const allJournals = await journalModels.journalModel.find({user:userId});
    return allJournals;
}
// delte a journal 

async function discardjournal(journalId){
    console.log("discard journal..")
    const discardJ = await journalModels.journalModel.findByIdAndDelete(journalId)
    return discardJ;
}
// Adding new Notes to specific Journal 

async function createNewNote(journalId,title,content){
    console.log("Creating new note for journal");
    console.log("id: ",journalId)
    console.log("title=>",title)
    console.log("content=>",content)
    const addNote = await journalModels.noteModel.insertMany({title:title,content:content,journal:journalId})
    return addNote;
}
// fetching all notes from a journal
async function getAllNotes(journalId){
    console.log("Fetching notes for the specific journal")
    const Notes = await journalModels.noteModel.find({journal:journalId});
    console.log(Notes)
    return Notes;
}
// single note fetch 

async function fetchSingleNote(journalId,noteId){
    console.log("Fetching single note ")
    const note = await journalModels.noteModel.findById(noteId)
    return  note
}
// Update/Change  a note 

async function updateNote(noteId,title,content){
    console.log("Updating a note ")
    let changedNote = await journalModels.noteModel.findByIdAndUpdate(noteId,{title:title,content:content,create_at:Date()});
    return changedNote;
}

// delete Note

async function deleteNote(noteId){
    console.log("Deleting a note")
    let deletedNote = await journalModels.noteModel.findByIdAndDelete(noteId);
    return deletedNote
}

module.exports = {signUpNewUser,isUserNamesaved,verifyUserName,verifyPassword,createNewJournal,getAllJournals,discardjournal,createNewNote,fetchSingleNote,getAllNotes,updateNote,deleteNote}



    