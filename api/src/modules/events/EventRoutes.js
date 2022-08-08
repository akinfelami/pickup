const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const EventController = require('./EventController');

router.use(auth);
// Edit event option?

router.get('/:eventId', EventController.getEvent);
router.get('/all', EventController.getAllEvents);
router.get('/:userId/events', EventController.getAllUserEvent);
router.post('/:userId/new', EventController.createEvent);
router.put('/:userId/:eventId/rsvp', EventController.rsvpUser);
router.put('/:eventId/edit', EventController.editEvent);
router.delete('/:eventId/delete', EventController.deleteEvent);

module.exports = router;
