const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth');
const CommmentController = require('./CommentController');

router.use(auth);

router.get('/:commentId', CommmentController.getComment);
router.post('/:userId/:eventId/new', CommmentController.createComment);
router.delete('/:commentId/:eventId/delete', CommmentController.deleteComment);

module.exports = router;
