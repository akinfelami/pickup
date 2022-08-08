const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const EventController = require('./EventController');

router.use(auth);

router.get('/:eventId', EventController.getEvent);
router.get('/all', EventController.getAllEvents);
router.get('/:userId/events', EventController.getAllUserEvent);
router.post('/:userId/new', EventController.createEvent);
router.put('/:userId/:eventId/rsvp', EventController.rsvpUser);
router.put('/:userId/:eventId/remove/rsvp', EventController.UnRsvpUser);
router.put('/:userId/:eventId/reschedule', EventController.rescheduleEvent);
router.delete('/:userId/:eventId/delete', EventController.deleteEvent);
router.post('/:userId/:eventId/comments/new', EventController.newComment);
router.delete(
	'/:userId/:eventId/comments/delete',
	EventController.deleteComment
);

module.exports = router;
