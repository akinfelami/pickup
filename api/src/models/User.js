const mongoose = require('mongoose');
const path = require('path');
const y = path.resolve('src', 'images', 'profileimg.png');

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		profile_pic: { type: String, default: y },
		active: { type: Boolean, default: false },
		events: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'event',
			},
		],
		interests: { type: Array, default: [] },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const User = mongoose.model('user', userSchema);
module.exports = User;
