var express = require('express');
var router = express.Router();
var usersService = require('../database/services/crud');

var app = express()
app.use(express.json());

const jwt = require('jsonwebtoken');
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

  const usersData = [
    {
    username: "ziomal",
    title: "kuropatwa"
    },
    {
        username: "przedstawiciel handlowy",
        title: "dostojny ptak"
    }   
  ]

module.exports = {router, authenticateToken};
