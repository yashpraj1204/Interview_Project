const express = require('express')
const journalController = require('../Controller/Journal.controller')
const router = express.Router();
router.post("/signup",journalController.addNewUser);
router.post("/signup/checkusername",journalController.checkUserName)
router.post("/login",journalController.VerifyUser_Authorization)
router.get("/:id",journalController.fetchJournals)
router.post("/:id/addjournal",journalController.addNewJournal);
router.delete("/:id/:journalId/deletejournal",journalController.deleteJournal);
router.get("/:id/:journalId",journalController.fetchNotes);
router.post("/:id/:journalId/addnote",journalController.addNewNote);
router.get("/:id/:journalId/:noteId",journalController.getANote);
router.put("/:id/:journalId/:noteId",journalController.updateANote);
router.delete("/:id/:journalId/:noteId",journalController.deleteANote);
module.exports = router;
