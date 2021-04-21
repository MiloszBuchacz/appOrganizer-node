var express = require('express');
var router = express.Router();
var auth = require('./authUser');
var crud = require('../database/services/noteService');
const service = require("./authUser");

// const authenticateToken = require('./authUser')

//add note
router.post('/notes', async (req, res) => {
    console.log(req.body);
    const user = await crud.addNote(req.body);
    console.log(user);
  res.json(user);
});
//delete note by id
router.delete('/notes/:id', async (req, res) =>{
    const user = await crud.deleteNote(req.params.id);
    console.log(user);
    res.json(user);
})
//update note data by id
router.put('/notes/:id', async (req, res) =>{
    const object = req.body;
    const id = req.params.id;
    const user = await crud.updateNote(id, object)
    console.log(user);
    res.json(user);
})
//find all notes
router.get('/notes', service.authenticateToken, async function(req, res, next){
    const { id } = req.user;
    res.json(await crud.findNotes({_userId: id}));
})
//find note by id
router.get('/note/:id', async function(req, res, next){
    res.json(await crud.findNote(req.params.id));
})
//find user notes
router.get('/userNote/:id', async function(req, res, next){
    res.json(await crud.findUserNotes(req.params.id));
})


module.exports = router;
