const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			minLength: [10, 'Must be at least 10 characters long'],
		},
		eventImage: {
			type: String,
		},
		spots: { type: Number, default: Infinity },
		photos: { type: Array, default: [] },
		fee: { type: Number, default: 0.0 },
		description: {
			type: String,
			required: true,
			minLength: [10, 'Must be at least 10 characters long'],
		},
		topics: { type: Array, default: [] },
		attendees: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
			},
		],
		venueType: { type: String, enum: ['Indoor', 'Outdoor', 'Online'] },
		eventLink: { type: String, default: '' },
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'comment',
			},
		],
		date: { type: Date, required: true },
		startTime: { type: Date, required: true },
		endTime: { type: Date, required: true },
		location: { type: String },
		organizer: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
				required: true,
			},
		],
		status: {
			type: String,
			enum: ['upcoming', 'past', 'saved'],
			default: 'upcoming',
		},
		availability: { type: Boolean, default: true },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const Event = mongoose.model('event', eventSchema);
module.exports = Event;
