const mongoose = require('mongoose')
const addUser = require('./crud')
const findUsers = require('./crud')


const url = 'mongodb://127.0.0.1:27017/mongo-appOrganizer'

mongoose.connect(url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, console.log("database connected"))

// addUser({
//      name: "chuj",
//      password: "chujCiNaImie",
//      age: 69
// })

// findUsers()
