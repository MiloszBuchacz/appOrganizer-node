const mongose = require('mongoose');
const { remove } = require('../models/note');
const note = require('../models/note');


const addNote = async (data) =>{
    try{
        const user = new note(data);
        await user.save();
        console.log(user);
        return user;
    } catch (error) {
        console.log(error);
    }
}

const findNotes = async () => {
    try {
        const users = await note.find({});
        console.log(users);
        return users;
    } catch (error){
        console.log(error);
    }
}

const findNote = async (id) => {
    try {
        const users = await note.findOne({_id: id});
        console.log(users);
        return users;
    } catch (error){
        console.log(error);
    }
}

const findNoteByName = async (name) => {
    try {
        const users = await note.findOne({ name: name });
        console.log(users);
        return users;
    } catch (error){
        console.log(error);
    }
}

const deleteNote = async (id) =>{
    try{
        const user = await note.deleteOne({_id: id});
        console.log(user);
        return user 
    } catch (error) {
        console.log(error)
    }
}

const updateNote = async (id, update) =>{
    try{
        const user = await note.updateOne({_id: id}, update);
        console.log(user);
        return user
    } catch (error) {
        console.log(error)
    }
}

const findUserNotes = async(userId) =>  {
    try{
        const reminder = await note.find({_userId: userId})
        console.log(reminder);
        return reminder
    } catch (error) {
        console.log(error)
    }
}

module.exports = {addNote, findNotes, findNote, findNoteByName, deleteNote, updateNote, findUserNotes};