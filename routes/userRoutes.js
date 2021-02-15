var express = require('express');
var router = express.Router();
var auth = require('./authUser');
var crud = require('../database/services/userService');
var reminders = require('../database/services/reminderService');

// const authenticateToken = require('./authUser')

//add user 
router.post('/users', async (req, res) => {
    console.log(req.body);
    const user = await crud.addUser(req.body);
    console.log(user);
  res.json(user);
});
//delete user by id
router.delete('/users/:id', async (req, res) =>{
    const user = await crud.deleteUser(req.params.id);
    console.log(user);
    res.json(user);
})
//update user data by id
router.put('/users/:id', async (req, res) =>{
    const object = req.body;
    const id = req.params.id;
    const user = await crud.updateUser(id, object)
    console.log(user);
    res.json(user);
})
//find all users
router.get('/users', async function(req, res, next){
    res.json(await crud.findUsers({}));
})
//find user by id
router.get('/user/:id', async function(req, res, next){
    res.json(await crud.findUser(req.params.id));
})
//find user reminders
router.get('/userReminder/:id', async function(req, res, next){
    res.json(await reminders.findUserReminders(req.params.id));
})

module.exports = router;
