const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.use(auth);

// FIND INDIVIDUAL GROUP
router.get('/findgroup/:groupid', async (req, res) => {
	try {
		const group = await Group.findById(req.params.groupid).lean().exec();
		res.status(200).json(group);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
});

// DELETE INDIVIDUAL GROUP -- ONLY OWNER PRIVILEDGE
router.delete('/deletegroup/:groupid/:userid', async (req, res) => {
	try {
		const group = await Group.findById(req.params.groupid).lean().exec();

		//  ensure only owner can delete
		if (group.owner._id != req.params.userid) {
			return res.status(409).send('You are not the group owner!');
		}

		await Group.findByIdAndDelete(req.params.groupid).lean().exec();

		res.status(200).json(group);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
});

// ALL GROUPS IN DB
router.get('/allgroups', async (req, res) => {
	try {
		const allGroups = await Group.find({}).sort({ createdAt: -1 });
		res.status(200).json(allGroups);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
});

// ALL GROUPS FOR A PARTICULAR USER
router.get('/groups/:userid', async (req, res) => {
	try {
		const user = await User.findById(req.params.userid).lean().exec();
		res.status(200).json(user.groups);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
});

// CREATE A NEW GROUP
router.post('/creategroup/:userid', async (req, res) => {
	try {
		const { name, location, about } = req.body;

		if (!(name && location && about)) {
			return res.status(400).send('All input is required');
		}

		const oldGroup = await Group.findOne({ name });

		if (oldGroup) {
			return res.status(409).send('Group Already exists');
		}

		const user = await User.findById(req.params.userid).lean().exec();

		const newGroup = new Group({
			name,
			owner: req.params.userid,
			location,
			about,
			members: user,
		});

		await newGroup.save();

		await User.findByIdAndUpdate(
			req.params.userid,
			{ $push: { groups: newGroup } },
			{ new: true, upsert: true }
		);

		res.status(200).json(newGroup);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
});

// JOIN GROUP
router.post('/joingroup/:groupid/:userid', async (req, res) => {
	try {
		const group = await Group.findById(req.params.groupid).lean().exec();

		const user = await User.findById(req.params.userid).lean().exec();

		const ifMember = await Group.find({
			members: user,
		});

		if (ifMember.length > 0) {
			return res.status(409).send('You are already a member of this Group!');
		}

		await User.findByIdAndUpdate(
			req.params.userid,
			{ $push: { groups: group } },
			{ new: true, upsert: true }
		);

		await Group.findByIdAndUpdate(
			req.params.groupid,
			{ $push: { members: user } },
			{ new: true, upsert: true }
		);

		res.status(200).json(group);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
});

// DELETE USER FROM GROUP

router.delete('/deleteuser/:groupid/:ownerid/:userid', async (req, res) => {
	try {
		const group = await Group.findById(req.params.groupid).lean().exec();
		const user = await User.findById(req.params.userid).lean().exec();

		//  ensure only owner can delete

		if (group.owner._id != req.params.ownerid) {
			return res.status(409).send('You are not the group owner!');
		}

		const userToDelete = await Group.find({
			members: user,
		});

		// for (let member in group.members) {
		// 	if (member._id === req.params.id) {
		// 		return res.status(200).json(member._id);
		// 	}
		// }

		res.status(200).json(userToDelete);
	} catch (err) {
		res.status(400).json({ status: 'failed', message: err.message });
	}
});

module.exports = router;
