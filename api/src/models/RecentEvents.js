const mongoose = require('mongoose');

const recentEventsSchema = new mongoose.Schema(
	{
		event: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'event',
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const recentEvents = mongoose.model('recents', recentEventsSchema);
module.exports = recentEvents;
