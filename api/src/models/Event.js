const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
	{
		Title: { type: String, required: true },
		owner: { type: Schema.Types.ObjectId, ref: 'user' },
		details: { type: Text, required: true },
		tags: { type: Array, default: [] },
		rsvp: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
			},
		],
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
