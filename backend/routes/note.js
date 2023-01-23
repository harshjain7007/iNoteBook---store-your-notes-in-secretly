const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');



// Router 1 : Get all the Notes using GET "api/note/fetchallnotes", login required 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.send(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Enternals Server Error")
    }
})

// Router 2 : Add a new note using POST "api/note/addnote", login required 
router.post('/addnote', fetchuser, [
    body('title', 'title must be atleast 3 character').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 charaters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);
        // if they are errors, return bad request and the errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Enternals Server Error")
    }
})

// Router 3 : Update an existing note using PUT "api/note/updatenote", login required 
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body
        // create a new note
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Find the note to be updated and update it 
        let note = await Note.findById(req.params.id) // ye vahi id hai jo update kerna chate hai 
        if (!note) { res.status(404).send("Not Found") }

        // now we are checking ki ye note vahi user ka hai ya ni 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not found")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Enternals Server Error")
    }
})


// Router 4 : Delete an exicting Note using Delete "api/note/deletenote", login required 
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it 
        let note = await Note.findById(req.params.id)
        if (!note) { res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note  
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not found") 
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "success": "Note has been deleted", note: note })
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Enternals Server Error")
    }
})

module.exports = router