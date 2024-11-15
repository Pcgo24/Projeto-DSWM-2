const express = require('express');
const { createFeedback, getFeedbackByDondokasId, updateFeedback, deleteFeedback } = require('./feedback');
const sessionMiddleware = require('../middleware/sessionMiddleware');

const router = express.Router();

router.post('/', sessionMiddleware, createFeedback);
router.get('/:DondokasId', getFeedbackByDondokasId);
router.put('/:FeedbackId', sessionMiddleware, updateFeedback);
router.delete('/:FeedbackId', sessionMiddleware, deleteFeedback);

module.exports = router;