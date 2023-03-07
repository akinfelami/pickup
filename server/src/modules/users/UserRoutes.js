const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth');
const userController = require('./UserController');


router.get('/get/:userId', auth, userController.getUser);
router.put('/update/:userId', auth, userController.updateAboutUser);
router.put('/update/firebase/:userId', auth, userController.updateFirebaseId);
router.put('/interests/:userId', auth, userController.updateUserInterests);
router.post('/register/', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', auth, userController.logoutUser);
router.get('/verify/:userId', userController.verifyUser);

module.exports = router;
