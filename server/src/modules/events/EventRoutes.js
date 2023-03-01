const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth');
const EventController = require('./EventController');

router.use(auth);

router.get('/get/:eventId', EventController.getEvent);
router.get('/all', EventController.getAllEvents);
router.get('/:userId/events', EventController.getAllUserEvent);
router.post('/:userId/new', EventController.createEvent);
router.put('/:userId/:eventId/rsvp', EventController.rsvpUser);
router.put('/:userId/:eventId/remove/rsvp', EventController.UnRsvpUser);
router.put('/:userId/:eventId/update', EventController.updateEvent);
router.delete('/:userId/:eventId/delete', EventController.deleteEvent);

module.exports = router;
