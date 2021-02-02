var express = require('express');
const port = 3000;

 //Importing app module, thus getting instance of an app
var app = require('./app'); 

//server listening
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)})

