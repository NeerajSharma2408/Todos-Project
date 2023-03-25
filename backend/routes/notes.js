const express = require('express');
const {getNotes, pasteNotes, delNotes} = require('../middleware/noteActions');


const router = express.Router();

router.get('/', async(req, res, next)=>{
    try {
        const notes = await getNotes();
        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
    }
    console.log("Notes Sent");
});

router.post('/', async(req, res, next)=>{
    try {
        const {title, desc} = req.body;
        await pasteNotes({title: title, desc: desc});
    } catch (error) {
        console.log(error);
    }
    const notes = await getNotes();
    console.log("Note Received");
    res.status(200).json(notes);
});

router.delete('/', async(req, res, next)=>{
    try {
        const {id} = req.body;
        await delNotes(id);
    } catch (error) {
        console.log(error);
    }
    const notes = await getNotes();
    console.log("Note deleted");
    res.status(200).json(notes);
})

module.exports = router;