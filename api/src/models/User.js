const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const path = require('path');
const y = path.resolve('src', 'images', 'profileimg.png');

const userSchema = new mongoose.Schema(
	{
		username: { type: String },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		profile_pic: { type: String, default: y },
		groups: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'group',
			},
		],
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

userSchema.pre('save', function (next) {
	if (!this.isModified('password')) return next();

	var hash = bcrypt.hashSync(this.password, 8);
	this.password = hash;
	return next();
});

userSchema.methods.checkPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('user', userSchema);
module.exports = User;
