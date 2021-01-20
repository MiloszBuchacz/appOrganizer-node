var express = require('express');
var router = express.Router();

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
  
  /* GET users listing. */
  router.get('/api/get', authenticateToken, (req, res) => {
    res.json(usersData.filter(post => post.username === req.user.name))
  })
  
  //setting token expire time
  function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: "60s"})
  }

  //autheticates if user has right token
  function authenticateToken(req,res,next){
  
    const authHeader = req.headers['authorization']
    const token  = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) return res.sendStatus(403)
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

module.exports = router;
