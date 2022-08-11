var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const User = require('../../models/User');

const getWelcome = async (req, res) => {
	res.status(200).send('Welcome');
};

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.userId)
			.cache({ expire: 10 })
			.lean()
			.exec();
		res.status(200).json({
			id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			displayName: user.username,
			groups: user.groups,
			events: user.events,
			about: user.about,
			interests: user.interests,
		});
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const updateAboutUser = async (req, res) => {
	try {
		const { about } = req.body;
		await User.findByIdAndUpdate(
			req.params.userId,
			{ about: about },
			{ new: true, upsert: true }
		);

		res.status(201).json({ status: 'Success' });
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const updateUserInterests = async (req, res) => {
	try {
		const { interests } = req.body;

		await interests.map((interest) => {
			User.findByIdAndUpdate(
				req.params.userId,
				{ $push: { interests: interest } },
				{ new: true, upsert: true }
			);
		});

		res.status(201).json({ status: 'Success' });
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const registerUser = async (req, res) => {
	try {
		const { firstName, lastName, username, email, password } = req.body;

		if (!(email && password && firstName && lastName)) {
			return res.status(400).send('All input required');
		}

		const oldUser = await User.findOne({ email });

		if (oldUser) {
			return res.status(409).send('User already exists. Please Login instead');
		}

		var encryptedPassword = await bcrypt.hash(password, 10);

		const user = new User({
			username: username || `${firstName} ${lastName}`,
			firstName,
			lastName,
			email: email.toLowerCase(),
			password: encryptedPassword,
		});

		// Create Tokens
		const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY);

		res.cookie('jwt', token, { httpOnly: true });

		await user.save();

		res.status(201).json({
			id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			displayName: user.username,
			groups: user.groups,
			events: user.events,
			interests: user.interests,
		});
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!(email && password)) {
			return res.status(400).send('All input required');
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).send({
				msg:
					'The email address ' + email + ' is not associated with any account',
			});
		}

		if (
			user &&
			(await bcrypt.compare(password, user.password)) &&
			user.active
		) {
			const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.TOKEN_KEY
			);

			res.cookie('jwt', token, { httpOnly: true });

			res.status(200).json({
				id: user._id,
				username: user.username,
				email: user.email,
				profile_pic: user.profile_pic,
				groups: user.groups,
				events: user.events,
				interests: user.interests,
				interests: user.interests,
				createdAt: user.createdAt,
			});
		}
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const logoutUser = async (req, res) => {
	try {
		res.cookie('jwt', '', { maxAge: 1 });
		res.send({ msg: 'You have been logged out' });
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

module.exports = {
	updateUserInterests,
	updateAboutUser,
	getWelcome,
	getUser,
	registerUser,
	loginUser,
	logoutUser,
};
