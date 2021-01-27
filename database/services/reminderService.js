const mongose = require('mongoose');
const { remove } = require('../models/reminder');
const Reminder = require('../models/reminder')


const addReminder = async (data) =>{
    try{
        const reminder = new Reminder(data);
        await reminder.save();
        console.log(reminder);
        return reminder;
    } catch (error) {
        console.log(error);
    }
}

const findReminders = async () => {
    try {
        const reminders = await Reminder.find({});
        console.log(reminders);
        return reminders;
    } catch (error){
        console.log(error);
    }
}

const deleteReminder = async (id) =>{
    try{
        const reminder = await Reminder.deleteOne({_id: id});
        console.log(reminder);
        return reminder 
    } catch (error) {
        console.log(error)
    }
}

module.exports = {addReminder, findReminders, deleteReminder}