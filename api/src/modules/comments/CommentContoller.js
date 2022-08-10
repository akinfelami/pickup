const Event = require('../../models/Event');
const User = require('../../models/User');
const Comment = require('../../models/Comment');

const getComment = async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.commentId)
			.cache({ expire: 10 })
			.lean()
			.exec();

		res.status(200).json(comment);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const createComment = async (req, res) => {
	try {
		const { text } = req.body;
		const user = await User.findById(req.params.userId).lean().exec();
		const event = await Event.findById(req.params.eventId).lean().exec();

		const comment = new Comment({
			text,
			author: user,
			event: event,
		});

		await comment.save();

		await Event.findByIdAndUpdate(
			req.params.eventId,
			{ $push: { comments: comment } },
			{ new: true, upsert: true }
		);

		res.status(201).json(comment);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const deleteComment = async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.commentId).lean().exec();

		await Event.findByIdAndUpdate(
			req.params.eventId,
			{ $pull: { comments: req.params.commentId } },
			{ new: true, upsert: true }
		);

		await Comment.findByIdAndDelete(req.params.commentId).lean().exec();

		res.status(200).json(comment);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

module.exports = { getComment, createComment, deleteComment };
