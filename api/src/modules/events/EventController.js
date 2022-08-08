const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');

// EventController.getEvent
router.get('/all', EventController.getAllEvents);
router.get('/:userId/events', EventController.getAllUserEvent);
router.post('/:userId/new', EventController.createEvent);
router.put('/:userId/:eventId/rsvp', EventController.rsvpUser);

router.put('/:eventId/edit', EventController.editEvent);
router.delete('/:eventId/delete', EventController.deleteEvent);

const getEvent = async (req, res) => {
	try {
		const event = await Event.findById(req.params.eventId).lean().exec();
		res.status(200).json(event);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const getAllUserEvent = async (req, res) => {
	try {
		const user = await User.findById(req.params.userId).lean().exec();
		res.status(200).json(user.events);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const createEvent = async (req, res) => {
	try {
		const { title, description, tags, location, time, date } = req.body;

		if (!(title && description && location)) {
			return res.status(400).send('All input required');
		}

		const user = await User.findById(req.params.userId).lean().exec();

		const event = new Event({
			title,
			description,
			tags,
			time,
			date,
			location,
			organizer: user,
		});

		await event.save();

		await User.findByIdAndUpdate(
			req.params.userId,
			{ $push: { events: event } },
			{ new: true, upsert: true }
		);

		res.status(200).json(event);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const rsvpUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.userId).lean().exec();
		const event = await Event.findById(req.params.eventId).lean().exec();

		const userRsvped = await Event.find({
			rsvp: user,
		});

		if (userRsvped.length > 0) {
			return res.status(409).send('You already rsvped for this event!');
		}

		await Event.findByIdAndUpdate(
			req.params.eventId,
			{ $push: { rsvp: user } },
			{ new: true, upsert: true }
		);

		await User.findByIdAndUpdate(
			req.params.userId,
			{ $push: { events: event } },
			{ new: true, upsert: true }
		);

		res.status(200).json(event);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

router.put('/:eventId/edit', EventController.editEvent);
