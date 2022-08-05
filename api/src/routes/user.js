const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/user/:id', auth, async (req, res) => {
	try {
		const user = await User.findById(req.params.id).lean().exec();
		res.status(200).json({ name: user.username, email: user.email });
	} catch (err) {
		res.status(400).json({ status: 'Invalid User' });
	}
});

router.post('/register', async (req, res) => {
	try {
		const { username, email, password } = req.body;

		if (!(email && password && username)) {
			res.status(400).send('All input required');
		}

		const oldUser = await User.findOne({ email });

		if (oldUser) {
			res.status(409).send('User already exists. Please Login instead');
		}

		var encryptedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			username,
			email: email.toLowerCase(),
			password: encryptedPassword,
		});

		// Create Tokens

		const token = jwt.sign(
			{ user_id: newUser._id, email },
			process.env.TOKEN_KEY
		);

		res.cookie('jwt', token, { httpOnly: true });

		res.status(201).json({
			id: newUser._id,
			username: newUser.username,
			email: newUser.email,
			profile_pic: newUser.profile_pic,
			interests: newUser.interests,
			createdAt: newUser.createdAt,
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({ err });
	}
});

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!(email && password)) {
			res.status(400).send('All input required');
		}

		const user = await User.findOne({ email });
		if (user && (await bcrypt.compare(password, user.password))) {
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
				interests: user.interests,
				createdAt: user.createdAt,
			});
		} else {
			res.status(400).send('Invalid Credentials');
		}
	} catch (err) {
		console.error(err);
	}
});

router.get('/logout', auth, async (req, res) => {
	try {
		res.cookie('jwt', '', { maxAge: 1 });
		res.send({ msg: 'You have been logged out' });
	} catch (err) {
		res.send({ msg: err });
	}
});

module.exports = router;
