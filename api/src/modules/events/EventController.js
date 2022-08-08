const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');

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

const UnRsvpUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.userId).lean().exec();
		const event = await Event.findById(req.params.eventId).lean().exec();

		const userRsvped = await Event.find({
			rsvp: user,
		});

		if (userRsvped.length === 0) {
			return res.status(409).send('You have not rsvped for this event!');
		}

		await Event.findByIdAndUpdate(
			req.params.eventId,
			{ $pull: { rsvp: user } },
			{ new: true, upsert: true }
		);

		await User.findByIdAndUpdate(
			req.params.userId,
			{ $pull: { events: event } },
			{ new: true, upsert: true }
		);

		res.status(200).json(event);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const rescheduleEvent = async (req, res) => {
	// User can only change time / date

	const { date, time } = req.body;
	try {
		const event = await Event.findById(req.params.eventId).lean().exec();
		const user = await User.findById(req.params.userId).lean().exec();

		if (event.organizer._id != req.params.userId) {
			return res.status(409).send('You are not the event organizer!');
		}

		await Event.findByIdAndUpdate(
			req.params.eventId,
			{ time: time },
			{ date: date },
			{ new: true, upsert: true }
		);

		res.status(200).json(event);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const deleteEvent = async (req, res) => {
	try {
		const event = await Event.findById(req.params.eventId).lean().exec();

		if (event.organizer._id != req.params.userId) {
			return res.status(409).send('You are not the event organizer!');
		}

		await Event.findByIdAndDelete(req.params.eventId).lean().exec();

		res.status(200).json(event);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

(module.exports = getEvent),
	getAllUserEvent,
	createEvent,
	rsvpUser,
	UnRsvpUser,
	rescheduleEvent,
	deleteEvent;
