const mongoose = require('mongoose')
const addUser = require('./crud')
const findUsers = require('./crud')


const url = 'mongodb://umqsbjnrhdr0y7jd1pwp:5S9DnxJMnYYq8eJGKKJk@bc6cooblol4ho8l-mongodb.services.clever-cloud.com:27017/bc6cooblol4ho8l'

mongoose.connect(url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, console.log("database connected"))
