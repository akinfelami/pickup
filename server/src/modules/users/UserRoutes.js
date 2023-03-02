const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth');
const userController = require('./UserController');


router.get('/get/:userId', auth, userController.getUser);
router.post('/update/:userId', auth, userController.updateAboutUser);
router.post('/update/firebase/:userId', auth, userController.updateFirebaseId);
router.post('/interests/:userId', auth, userController.updateUserInterests);
router.post('/register/', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', auth, userController.logoutUser);

module.exports = router;
