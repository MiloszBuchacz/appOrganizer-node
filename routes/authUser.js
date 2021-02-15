var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var app = express()
app.use(express.json());

const jwt = require('jsonwebtoken');
const crud = require('../database/services/userService');
const { route } = require('./userRoutes');
require('dotenv').config()


//authenticate user
router.post('/api/post', (req, res) => {
    const username = req.body.username
    const user = {name: username}
  
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN)
    res.json({accessToken: accessToken, refreshToken: refreshToken})
  })

  router.get('/api/auth/test', authenticateToken, async (req, res) => {
    console.log(req.user);
    res.json(req.user);
  });
  
  /* GET users listing. */
  router.get('/api/get', authenticateToken, (req, res) => {
    res.json(usersData.filter(post => post.username === req.user.name))
  })
  
  //setting token expire time
  function generateAccessToken(user){
    return jwt.sign(user, process.env.SECRET)
  }

  function decodeToken(token) {
    return jwt.decode(token);
  }

  //autheticates if user has right token
  function authenticateToken(req,res,next){
  
    const authHeader = req.headers['authorization']
    const token  = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      console.log(user);
      req.user = user
      next()
    })
  }

  //bcrypting password
  router.post('/api/auth/signup', async (req, res) => {
    try{
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = await crud.addUser({name: req.body.username, password: hashedPassword});
      res.json(user)
    } catch {
      res.status(500).send()
    }
  })

  //user login
  router.post('/api/auth/signin', async (req, res) =>{
    const user = await crud.findUserByName(req.body.username);
    const compare = await bcrypt.compare(req.body.password, user.password);
    if(compare){
      const token = generateAccessToken({username: user.name, id: user._id });
      await crud.updateUser(user._id,{token: token});
      res.json({accessToken: token});
    } else {
      res.status(401).send();
    }
  }) 

  
module.exports = {router, authenticateToken};
