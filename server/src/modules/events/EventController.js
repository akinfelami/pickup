const Event = require('../../models/Event');
const User = require('../../models/User');
const RecentEvents = require('../../models/RecentEvents');
const Prisma  = require('@prisma/client');

const prisma = new Prisma.PrismaClient();


const getEvent = async (req, res) => {
	// #swagger.tags = ['Events']

	try{
		const event = await prisma.event.findUnique({
			where: {
				id: req.params.eventId
			}
		})
		res.status(200).json(event)

	}catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}

};

const getAllUserEvent = async (req, res) => {
	// #swagger.tags = ['Events']

	// Get events a user has associated with them

	try{
		const user = await prisma.user.findUnique({
			where: {
				id: req.params.userId
			},
			include: {
				events: true
			}
		})
		res.status(200).json(user)
	}catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const getAllEvents = async (req, res) => {
	// #swagger.tags = ['Events']

	// All events in the database

	try{
		const allEvents = await prisma.event.findMany({
			orderBy: {
				createdAt: 'desc'
			}
		})
		res.status(200).json(allEvents)
	}catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const createEvent = async (req, res) => {
	// #swagger.tags = ['Events']

	// Create a new event

	try{
		await prisma.event.create({
			data: {
				...req.body,
				owner: {
					connect: {
						id: req.params.userId
					}
				}
			}
		}
		)
		res.status(201).json({ status: 'Success' });
	}catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}

};

const rsvpUser = async (req, res) => {
	// #swagger.tags = ['Events']

	// RSVP a user to an event

	try{

		// Check if user is already rsvped to event

		const user = await prisma.eventEnrollment.findUnique({
			where: {
				userId: req.params.userId,
			}
		})

		if (user) {
			return res.status(409).send('You already rsvped for this event!');
		}

		await prisma.eventEnrollment.create({
			data: {
				user: {
					connect: {
						id: req.params.userId
					}
				},
				event: {
					connect: {
						id: req.params.eventId
					}
				}
			}
		})
		res.status(200).json({ status: 'success', message: 'User rsvped successfully' });
	} catch (e) {
		res.status(400).json({ status: 'failed', message: e.message });
	}

};

const UnRsvpUser = async (req, res) => {
	// #swagger.tags = ['Events']


	// UnRSVP a user from an event

	try {

		// Check if user is already rsvped to event

		const user = await prisma.eventEnrollment.findUnique({
			where: {
				userId: req.params.userId,
			}
		})

		if (!user) {
			return res.status(409).send('You have not rsvped for this event!');
		}

		await prisma.eventEnrollment.delete({
			where: {
				userId: req.params.userId
			}
		})

		res.status(200).json({ status: 'success', message: 'User un-rsvped successfully' });
	}catch (e) {
		res.status(400).json({ status: 'failed', message: e.message });
	}

};

const updateEvent = async (req, res) => {
	// #swagger.tags = ['Events']

	// Update an event

	try {

		const event = await prisma.event.findUnique({
			where: {
				id: req.params.eventId
			}
		})

		if (event.ownerId != req.params.userId) {
			return res.status(409).send('You are not the event organizer!');
		}

		await prisma.event.update({
			where: {
				id: req.params.eventId
			}, data:{
				...req.body
			}
		})

		res.status(200).json({ status: 'success', message: 'Event updated successfully' });
		}catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}

};

const deleteEvent = async (req, res) => {
	// #swagger.tags = ['Events']


	// Delete an event

	try{
		const event = await prisma.event.findUnique({
			where: {
				id: req.params.eventId
			}
		})
		if (event.ownerId != req.params.userId) {
			return res.status(409).send('You are not the event organizer!');
		}
		await prisma.event.delete({
			where: {
				id: req.params.eventId
			}
		})

		res.status(200).json({ status: 'success', message: 'Event deleted successfully' });
	}catch (err) {
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
