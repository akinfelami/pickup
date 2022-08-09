const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			trim: true,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},

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

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;
