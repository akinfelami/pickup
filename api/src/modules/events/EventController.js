const Event = require('../../models/Event');
const User = require('../../models/User');
const RecentEvents = require('../../models/RecentEvents');

const getEvent = async (req, res) => {
	try {
		const event = await Event.findById(req.params.eventId).lean().exec();

		const isEventDeleted = await RecentEvents.find({
			recentlyDeleted: event._id,
		});
		if (isEventDeleted.length > 0) {
			return res.status(401).send('Oops! This event has been deleted');
		}
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

const getAllEvents = async (req, res) => {
	try {
		const allEvents = await Event.find({}).sort({ createdAt: -1 });

		res.status(200).send(allEvents);
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

const rescheduleEvent = async (req, res) => {
	// User can only change time / date

	try {
		const { date, time } = req.body;

		const event = await Event.findById(req.params.eventId).lean().exec();

		if (event.organizer._id != req.params.userId) {
			return res.status(409).send('You are not the event organizer!');
		}

		const updatedEvent = await Event.findByIdAndUpdate(
			req.params.eventId,
			{ time: time, date: date },
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
	rescheduleEvent,
	deleteEvent,
	getAllEvents,
};
