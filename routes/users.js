var express = require('express');
var router = express.Router();
 var auth = require('./authUser');
var crud = require('../database/services/crud');

// const authenticateToken = require('./authUser')

//add user endpoint
router.post('/users', async (req, res) => {
    console.log(req.body);
    const user = await crud.addUser(req.body);
    console.log(user);
  res.json(user);
});
//delete user endpoint
router.delete('/users/:id', async (req, res) =>{
    const user = await crud.deleteUser(req.params.id);
    console.log(user);
    res.json(user);
})
//update user endpoint
router.put('/users/:id', async (req, res) =>{
    const object = req.body;
    const id = req.params.id;
    const user = await crud.updateUser(id, object)
    console.log(user);
    res.json(user);
})
//finding all users
router.get('/users', async function(req, res, next){
    res.json(await crud.findUsers({}));
})

router.get('/user/:id', async function(req, res, next){
    res.json(await crud.findUser(req.params.id));
})

module.exports = router;
