var bcrypt = require('bcrypt');
const User = require('../../models/User');
const admin = require('firebase-admin');
const Prisma = require('@prisma/client');

const prisma = new Prisma.PrismaClient();

const getUser = async (req, res) => {
	// #swagger.tags = ['Users']
	try{
		const user = await prisma.user.findUnique({

			where: {
				id: req.params.userId
			}
		})
		// Note to self: should I include all user fields here?
		res.status(200).json(user)

	}catch(err){
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const updateAboutUser = async (req, res) => {
	// #swagger.tags = ['Users']

	try{
		const { about } = req.body;
		const user = await prisma.user.update({
			where: {
				id: req.params.userId
			},
			data: {
				about: about
			}
		})
		res.status(201).json({ status: 'Success' });
	}catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const updateFirebaseId = async (req, res) => {
	// #swagger.tags = ['Users']

	try{
		const { firebaseId } = req.body;
		const user = await prisma.user.update({
			where: {
				id: req.params.userId
			},
			data: {
				firebaseId: firebaseId
			}
		})
		res.status(201).json({ status: 'Success' });
	}catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const updateUserInterests = async (req, res) => {
	// #swagger.tags = ['Users']

	try {
		const { interests } = req.body;
		const user = await prisma.user.update({
			where: {
				id: req.params.userId
			},
			data: {
				interests: interests
			}
		})
		res.status(201).json({ status: 'Success' });
	}catch (err){
		res.status(400).json({ status: 'failed', message: err.message });
	}

};

const registerUser = async (req, res) => {
	// #swagger.tags = ['Users']

	try {
		const oldUser = await prisma.user.findUnique({
			where: {
				email: req.body.email
			}
		})

		if (oldUser) {
			return res.status(400).json("User already exists. Please Login instead");
		}

		const user = await prisma.user.create({
			data: {
				...req.body
			}
		})

		res.status(201).json(user);
	}catch (err){
		res.status(400).json({ status: 'failed', message: err.message });
	}

};

const loginUser = async (req, res) => {
	// #swagger.tags = ['Users']
	try{
		await prisma.user.update({
			where: {
				email: req.body.email
			}, data:{
				active: true
			}
		})
		res.status(200).json({ status: 'Success' })
	}catch (err){
		res.status(400).json({ status: 'failed', message: err.message });
	}
};

const logoutUser = async (req, res) => {
	// #swagger.tags = ['Users']
	try{
		await prisma.user.update({
			where: {
				id: req.body.email
			}, data:{
				active: false
			}
		})
	}catch (err){
		res.status(400).json({ status: 'failed', message: err.message });
	};
};

const verifyUser = async (req, res) => {
	// #swagger.tags = ['Users']
	try{
		const user = await prisma.user.update({
			where: {
				id: req.params.userId
			}, data:{
				verified: true
			}
		})

		res.status(200).json({ status: 'Success' })
	}catch (err){
		res.status(400).json({ status: 'failed', message: err.message });
	}
}

module.exports = {
	updateUserInterests,
	updateAboutUser,
	updateFirebaseId,
	getUser,
	registerUser,
	loginUser,
	logoutUser,
	verifyUser
};
