const mongoose = require('mongoose')
const { token } = require('morgan')

const User = mongoose.model('User',{
    name: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },    
    token: String
})

module.exports = User