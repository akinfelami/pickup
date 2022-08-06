const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		about: { type: String, required: true },
		location: { type: String },
		members: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
			},
		],
		events: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'events',
			},
		],
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const Group = mongoose.model('group', groupSchema);
module.exports = Group;
