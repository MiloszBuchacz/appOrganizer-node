var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/authToken');

var app = express();






require('dotenv').config()
const jwt = require('jsonwebtoken');

app.use(express.json());


//authenticate user
app.post('/api/info', (req, res) => {
    const username = req.body.username
    const user = {name: username}
  
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
  })
  



  // require('dotenv').config()
  // const jwt = require('jsonwebtoken')
  // app.use(express.json())
  
  
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
  
  
  
  /* GET users listing. */
  app.get('/users', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
  })
  
  
  function authenticateToken(req,res,next){
  
    const authHeader = req.headers['authorization']
    const token  = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  
  }






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
