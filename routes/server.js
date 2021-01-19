var express = require('express');

//Importing app module, thus getting instance of an app
var app = require('../app');
const port = 3000;
  

//server listening
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)})

