var express = require('express');
var router = express.Router();
 var auth = require('./authUser');
var crud = require('../database/services/crud');

// const authenticateToken = require('./authUser')

/* post home page. */
router.post('/users', async (req, res) => {
    console.log(req.body);
    const user = await crud.findUsers({
        name: req.body.name,
        password: req.body.password,
        age: req.body.age
    });
    console.log(user);
  res.json(user);
});

router.delete('/users/:id', async (req, res) =>{
    const user = await crud.deleteUser(req.params.id);
    console.log(user);
    res.json(user);
})

router.get('/users', async function(req, res, next){
    res.json(await crud.findUsers());
})

module.exports = router;
