const express = require('express');
const {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback
} = require('../controllers/feedbackController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// POST route to create a new feedback
router.post('/',verifyToken, createFeedback);

// GET route to fetch all feedback entries
router.get('/', getAllFeedbacks);

// GET route to fetch a feedback entry by ID
router.get('/:id', getFeedbackById);

// PUT route to update a feedback entry by ID
router.put('/:id',verifyToken, updateFeedback);

// DELETE route to remove a feedback entry by ID
router.delete('/:id',verifyToken, deleteFeedback);

module.exports = router;
