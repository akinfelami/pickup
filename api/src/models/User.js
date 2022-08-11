const mongoose = require('mongoose');
const path = require('path');
const img =
	'https://firebasestorage.googleapis.com/v0/b/cornell-pickup.appspot.com/o/profileimg.png?alt=media&token=0217244c-0dc7-4984-9b03-54d9037d2ff0';
const userSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		LastName: { type: String, required: true },
		username: { type: String },
		about: { type: String },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		profile_pic: { type: String, default: img },
		active: { type: Boolean, default: false },
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
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
