var express = require('express');
var router = express.Router();
var reminderService = require('../database/services/reminderService');

router.post('/reminders', async (req, res) => {
    console.log(req.body);
    const user = await reminderService.addReminder({
        name: req.body.name,
        description: req.body.description,
        interval: req.body.interval,
        weekOrMonthDue: req.body.weekOrMonthDue,
        active: req.body.active
    });
    console.log(user);
  res.json(user);
});

router.delete('/users/:id', async (req, res) =>{
    const user = await crud.deleteUser(req.params.id);
    console.log(user);
    res.json(user);
})



module.exports = router;