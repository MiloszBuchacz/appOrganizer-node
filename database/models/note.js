const mongoose = require('mongoose')

const note = mongoose.model('note',{
    name: {
        type: String
    },
    body: {
        type: String
    },
    _userId: {
        type: String
    }
})

module.exports = note;