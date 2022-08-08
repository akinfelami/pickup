const express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const User = require('../models/User');

const getWelcome = async (req, res) => {
	res.status(200).send('Welcome');
};

const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id).lean().exec();
		res.status(200).json({
			id: user._id,
			name: user.username,
			email: user.email,
			groups: user.groups,
			events: user.events,
			interests: user.interests,
		});
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const getAllUsers = async (req, res) => {
	try {
		const allUsers = await User.find({}).sort({ createdAt: -1 });
		for (let user in allUsers) {
			res.status(200).json({
				id: user._id,
				name: user.username,
				email: user.email,
				groups: user.groups,
				events: user.events,
				interests: user.interests,
			});
		}
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const registerUser = async (req, res) => {
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

		const newUser = new User({
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

		await newUser.save();

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
};

const loginUser = async (req, res) => {
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
				groups: user.groups,
				events: user.events,
				interests: user.interests,
				interests: user.interests,
				createdAt: user.createdAt,
			});
		}
	} catch (err) {
		console.error(err);
		res.status(400).send('Invalid Credentials');
	}
};

const logoutUser = async (req, res) => {
	try {
		res.cookie('jwt', '', { maxAge: 1 });
		res.send({ msg: 'You have been logged out' });
	} catch (err) {
		res.send({ msg: err });
	}
};

(module.exports = getWelcome),
	getUser,
	registerUser,
	loginUser,
	logoutUser,
	getAllUsers;
