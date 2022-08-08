const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			minLength: [10, 'Must be at least 10 characters long'],
		},
		description: {
			type: Text,
			required: true,
			minLength: [10, 'Must be at least 10 characters long'],
		},
		tags: { type: Array, default: [] },
		rsvp: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
			},
		],
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'comment',
			},
		],
		date: { type: Date, required: true },
		time: { type: Date, required: true },
		location: { type: String },
		organizer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		status: {
			type: String,
			default: 'Upcoming',
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const Event = mongoose.model('event', eventSchema);
module.exports = Event;
