const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			minLength: [10, 'Must be at least 10 characters long'],
		},
		owner: { type: Schema.Types.ObjectId, ref: 'user' },
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
		date: { type: Date },
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
