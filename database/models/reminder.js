const mongoose = require('mongoose')

const Reminder = mongoose.model('Reminder',{
    name: {
        type: String
    },
    description: {
        type: String
    },
    interval: {
        type: String
    },
    weekOrMonthDue:{
        type: Number
    },
    active: {
        type: Boolean
    },
    userId: { 
        type: String
    } 
})

module.exports = Reminder;