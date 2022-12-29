const Event = require('../../models/Event');
const User = require('../../models/User');
const RecentEvents = require('../../models/RecentEvents');

const getEvent = async (req, res) => {
	try {
		const event = await Event.findById(req.params.eventId)
			.cache({ expire: 10 })
			.lean()
			.exec();

		res.status(200).json(event);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const getAllUserEvent = async (req, res) => {
	try {
		const user = await User.findById(req.params.userId)
			.cache({ expire: 10 })
			.lean()
			.exec();
		res.status(200).json(user.events);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const getAllEvents = async (req, res) => {
	try {
		const allEvents = await Event.find({})
			.cache({ expire: 10 })
			.sort({ createdAt: -1 });

		res.status(200).send(allEvents);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const createEvent = async (req, res) => {
	try {
		const { title, description, tags, location, time, date, spots } = req.body;

		const user = await User.findById(req.params.userId).lean().exec();

		const event = new Event({
			title,
			eventImage,
			photos,
			fee,
			description,
			topics,
			attendees,
			venueType,
			eventLink,
			comments,
			startTime,
			endTime,
			spots,
			date,
			location,
			organizer: [user],
			status: 'upcoming',
			availability,
		});

		await event.save();

		await User.findByIdAndUpdate(
			req.params.userId,
			{ $push: { events: event } },
			{ new: true, upsert: true }
		);

		res.status(201).json(event);
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

		const updatedEvent = await Event.findByIdAndUpdate(
			req.params.eventId,
			{ $push: { rsvp: user } },
			{ new: true, upsert: true }
		);

		const updatedUser = await User.findByIdAndUpdate(
			req.params.userId,
			{ $push: { events: event } },
			{ new: true, upsert: true }
		);

		res.status(200).json(updatedEvent);
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

		const updatedEvent = await Event.findByIdAndUpdate(
			req.params.eventId,
			{ $pull: { rsvp: user._id } },
			{ new: true, upsert: true }
		);

		const updatedUser = await User.findByIdAndUpdate(
			req.params.userId,
			{ $pull: { events: event._id } },
			{ new: true, upsert: true }
		);

		res.status(200).json(updatedEvent);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const updateEvent = async (req, res) => {
	try {
		const { date, time, photo } = req.body;

		const event = await Event.findById(req.params.eventId).lean().exec();

		if (event.organizer._id != req.params.userId) {
			return res.status(409).send('You are not the event organizer!');
		}

		const updatedEvent = await Event.findByIdAndUpdate(
			req.params.eventId,
			{ time: time, date: date, $push: { photos: photo } },
			{ new: true, upsert: true }
		);

		res.status(200).json(updatedEvent);
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

		const recent = new RecentEvents({
			event: event._id,
		});

		await recent.save();

		await Event.findByIdAndDelete(req.params.eventId).lean().exec();

		res.status(200).json(event);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

module.exports = {
	getEvent,
	getAllUserEvent,
	createEvent,
	rsvpUser,
	UnRsvpUser,
	updateEvent,
	deleteEvent,
	getAllEvents,
};
