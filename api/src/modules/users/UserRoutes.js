const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('./UserController');

router.get('/', auth, userController.getWelcome);
router.get('/:id', auth, userController.getUser);
router.get('/all', auth, userController.getAllUsers);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', auth, userController.logoutUser);

module.exports = router;
