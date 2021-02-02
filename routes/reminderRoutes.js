var express = require('express');
var router = express.Router();
var reminderService = require('../database/services/reminderService');

router.post('/reminders', async (req, res) => {
    console.log(req.body);
    const reminder = await reminderService.addReminder(req.body);
    console.log(reminder);
  res.json(reminder);
});

router.delete('/reminders/:id', async (req, res) =>{
    const user = await reminderService.deleteReminder(req.params.id);
    console.log(user);
    res.json(user);
})

router.get('/reminders', async function(req, res, next){
    res.json(await reminderService.findReminders({}));
})

router.get('/reminder/:id', async function(req, res, next){
    res.json(await reminderService.findReminder(req.params.id));
})

router.put('/reminders/:id', async (req, res) =>{
    const object = req.body;
    const id = req.params.id;
    const reminder = await reminderService.updateReminder(id, object)
    console.log(reminder);
    res.json(reminder);
})



module.exports = router;